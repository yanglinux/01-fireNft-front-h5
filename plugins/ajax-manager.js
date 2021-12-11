import axios from 'axios';

class AjaxManager {
  instance = null;
  defaultHandlers = {};

  constructor(config) {
    this.instance = AjaxManager.createInstance(config);
  }

  getInstance() {
    return this.instance;
  }

  static createInstance(config) {
    return axios.create(
      config || {
        timeout: 1000,
      }
    );
  }

  static makeAjaxStatus(name) {
    return {
      REQUEST: `${name} REQUEST`,
      SUCCESS: `${name} SUCCESS`,
      FAILURE: `${name} FAILURE`,
      ERROR: `${name} ERROR`,
      CANCELED: `${name} CANCELED`,
    };
  }

  static makeBasicAjaxState(data = null) {
    return {
      onFetch: false,
      error: false,
      // this is status is not updated if set `updates.onSuccess`
      loaded: false,
      message: '',
      data,
      headers: {},
      status: null,
    };
  }

  setDefaultHandlers(obj) {
    Object.assign(this.defaultHandlers, obj);
  }

  create(config = {}) {
    const {
      name,
      defaultValue = null,
      axiosConfig = {},
      handlers = {},
      updates = {},
      vuex = {},
      /**
       * Worning/Errorを返した時、どのようにエラーを表示するか
       * @type {'notify'|'dialog'} errorHandleStrategy
       */
      errorHandleStrategy = 'notify',
    } = config;

    const {
      completed = null,
      onFinal = null,
      error = null,
      combineParams = null,
      failureCheck = null,
      canRequest = null,
    } = {
      ...this.defaultHandlers,
      ...handlers,
    };

    const { onRequest, onSuccess, onFailure, onError } = updates;

    const {
      state: stateList = {},
      actions: actionsList = {},
      mutations: mutationsList = {},
      getters: gettersList = {},
      modules: modulesList = {},
    } = vuex;

    const STATUS = AjaxManager.makeAjaxStatus(name);
    const state = () => ({
      ...AjaxManager.makeBasicAjaxState(defaultValue),
      ...stateList,
    });
    const $this = this;

    const actions = {
      ...actionsList,
      request(context, params = {}) {
        if (null !== canRequest && !canRequest(context)) {
          return;
        }
        const { commit } = context;
        let combinedConfig = { ...axiosConfig };
        if (!combinedConfig.method) combinedConfig.method = 'get';
        if (combineParams) {
          combinedConfig = combineParams
            ? Object.assign({}, axiosConfig, combineParams(params, axiosConfig, context))
            : axiosConfig;
        } else {
          const paramsKey = combinedConfig.method.toLocaleLowerCase() === 'get' ? 'params' : 'data';

          if (params instanceof FormData) {
            combinedConfig[paramsKey] = params;
          } else {
            combinedConfig[paramsKey] = {
              ...combinedConfig[paramsKey],
              ...params,
            };
          }
        }

        commit(STATUS.REQUEST);

        return $this
          .instance(combinedConfig)
          .then(({ data, headers, status }) => {
            commit('setHeaders', headers);
            commit('setStatus', status);

            let isFailure = false;
            if (failureCheck) {
              isFailure = failureCheck(data);
            }

            if (isFailure) {
              commit(STATUS.FAILURE, data);
            } else {
              const [success, result] = completed ? completed(context, data) : [true, data];
              if (success) commit(STATUS.SUCCESS, result);
              else commit(STATUS.FAILURE, result);
            }
            return data;
          })
          .catch((e) => {
            commit('setStatus', e.response?.status);
            const err = e.response ? e.response.data : e;
            commit(STATUS.ERROR, error ? error(err) : err);
          })
          .finally(() => {
            if (onFinal) onFinal(context, errorHandleStrategy);
          });
      },
      resetState({ commit }) {
        commit('resetState');
      },
    };
    const mutations = {
      ...mutationsList,
      resetState(state) {
        Object.assign(state, AjaxManager.makeBasicAjaxState(defaultValue));
      },
      setHeaders(state, data) {
        state.headers = data;
      },
      setStatus(state, value) {
        state.status = value;
      },
      [STATUS.REQUEST](state) {
        state.onFetch = true;
        state.message = '';
        state.error = false;
        state.loaded = false;

        if (onRequest) {
          onRequest(state);
        } else {
          state.data = defaultValue;
        }
      },
      [STATUS.SUCCESS](state, data) {
        state.onFetch = false;
        state.loaded = true;
        if (onSuccess) {
          onSuccess(state, data);
        } else {
          state.data = data;
        }
      },
      [STATUS.FAILURE](state, data) {
        state.onFetch = false;
        state.error = true;
        state.data = data;
        state.loaded = true;
        if (onFailure) {
          onFailure(state, data);
        } else {
          state.message = data.message || data;
        }
      },
      [STATUS.ERROR](state, data) {
        state.onFetch = false;
        state.error = true;
        state.data = data;
        state.loaded = true;
        if (onError) {
          onError(state, data);
        } else {
          state.message = data.message || data;
        }
      },
    };

    const getters = { ...gettersList };
    const modules = { ...modulesList };

    return { state, actions, mutations, getters, modules, namespaced: true };
  }
}

export default AjaxManager;
