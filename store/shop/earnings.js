const state = () => ({
  fields: [
    { value: 'created_at', text: 'time' },
    { value: 'product.title', text: 'product_name' },
    { value: 'product.id', text: 'product_code' },
    { value: 'amount', text: 'order_price' },
    { value: 'platform_fee', text: 'platform_fee' },
    { value: 'actions', text: '' },
  ],
  modal: {
    visible: false,
    data: {},
  },
  monthModal: {
    visible: false,
  },
});

const actions = {
  setModal({ commit }, data) {
    commit('setModal', data);
  },
  setMonthModal({ commit }, data) {
    commit('setMonthModal', data);
  },
};

const mutations = {
  setModal(state, data) {
    state.modal = data;
  },
  setMonthModal(state, data) {
    state.monthModal = data;
  },
};
export { state, actions, mutations };
