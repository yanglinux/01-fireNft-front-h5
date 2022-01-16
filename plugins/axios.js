import AjaxManager from '@/plugins/ajax-manager';
import Vue from 'vue';
import axios from 'axios';
console.log(process.env.BASE_URL);

const TIMEOUT = 600000;
const axiosConfig = {
  baseURL: process.env.BASE_URL || 'http://localhost:4000',
  timeout: TIMEOUT,
};

axios.defaults.timeout = axiosConfig.timeout;
axios.defaults.baseURL = axiosConfig.baseURL;

const setHeader = (name) => {
  return function (config) {
    let headers = JSON.parse(window.localStorage.getItem(name));
    if (headers) {
      config.headers['access-token'] = headers.accessToken;
      config.headers['client'] = headers.client;
      config.headers['uid'] = headers.uid;
    }
    config.headers['Accept'] = '*/*';
    config.headers['content-type'] = 'application/json;charset=UTF-8';
    return config;
  };
};

const setErrorHandler = function (error) {
  return Promise.reject(error);
};

const setResponseHandler = function (response) {
  return response;
};

const ajaxManager = new AjaxManager(axiosConfig);
const instance = ajaxManager.getInstance();
instance.interceptors.request.use(setHeader('shop'), setErrorHandler);
instance.interceptors.response.use(setResponseHandler, setErrorHandler);

const vueAjaxManager = new AjaxManager(axiosConfig);
const vueInstance = vueAjaxManager.getInstance();
vueInstance.interceptors.request.use(setHeader('headers'), setErrorHandler);
vueInstance.interceptors.response.use(setResponseHandler, setErrorHandler);
Vue.prototype.$axios = vueInstance;

const statusCheck = ({ dispatch, state }) => {
  const status = state.status;
  if (status) {
    if (status >= 500) {
      dispatch('toast/add', { text: window.$nuxt._i18n.t('errors.common'), type: 'error' }, { root: true });
    }
  }
};
ajaxManager.setDefaultHandlers({ onFinal: statusCheck });

export { ajaxManager, vueAjaxManager };
