const state = () => ({
  fields: [
    { value: 'updated_at', text: 'replacement_updated_at' },
    { value: 'status', text: 'send_status' },
    { value: 'product.title', text: 'product_name' },
    { value: 'product.id', text: 'product_code' },
    { value: 'product.status', text: '' },
    { value: 'actions', text: '' },
  ],
  modal: {
    visible: false,
    data: {},
  },
  sendModal: {
    visible: false,
    data: {},
  },
});

const actions = {
  setModal({ commit }, data) {
    commit('setModal', data);
  },
  setSendModal({ commit }, data) {
    commit('setSendModal', data);
  },
};

const mutations = {
  setModal(state, data) {
    state.modal = data;
  },
  setSendModal(state, data) {
    state.sendModal = data;
  },
};

export { state, actions, mutations };
