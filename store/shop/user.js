const state = () => ({
  form: {
    shop_id: '',
    login_id: '',
    password: '',
  },
  userinfo: {},
  modal: {
    visible: false,
  },
});

const getters = {
  isLogin(state) {
    return !!state.userinfo.uid;
  },
};

const actions = {
  setUserinfo({ commit }, data) {
    commit('setUserinfo', data);
  },
  setForm({ commit }, data) {
    commit('setForm', data);
  },
  setModal({ commit }, data) {
    commit('setModal', data);
  },
};

const mutations = {
  setUserinfo(state, data) {
    if (!Object.keys(data).length) window.localStorage.clear();
    else window.localStorage.setItem('shop', JSON.stringify(data));
    state.userinfo = data;
  },
  setForm(state, data) {
    state.form = { ...data };
  },
  setModal(state, data) {
    state.modal = data;
  },
};

export { state, actions, mutations, getters };
