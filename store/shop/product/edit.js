const state = () => ({
  detail: {},
});

const actions = {
  setDetail({ commit }, data) {
    commit('setDetail', data);
  },
};

const mutations = {
  setDetail(state, data) {
    state.detail = data;
  },
};

export default { state, actions, mutations };
