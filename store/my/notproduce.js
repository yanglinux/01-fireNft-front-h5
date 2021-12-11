const state = () => ({
  modal: {
    visible: false,
    title: null,
    description: null,
    contract_address: null,
    image_url: null,
  },
});

const actions = {
  setModal({ commit }, data) {
    commit('setModal', data);
  },
};

const mutations = {
  setModal(state, data) {
    state.modal = data;
  },
};

export default { state, actions, mutations };
