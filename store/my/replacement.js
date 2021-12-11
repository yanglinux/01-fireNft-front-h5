const state = () => ({
  modal: {
    visible: false,
    product_id: null,
    cover_image_url: '',
  },
});

const actions = {
  setModal({ commit }, data) {
    commit('setModal', data);
  },
};

const mutations = {
  setModal(state, data) {
    const modal = {
      ...state.modal,
      ...data,
    };

    state.modal = modal;
  },
};

export default { state, actions, mutations };
