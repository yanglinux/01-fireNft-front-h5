const state = () => ({
  fields: [
    { value: 'created_at', text: 'created_at' },
    { value: 'product_name', text: 'product_name' },
    { value: 'product_id', text: 'product_code' },
    { value: 'pay_method', text: 'pay_method' },
    { value: 'id', text: 'order_no' },
    { value: 'amount', text: 'price' },
    { value: 'status', text: 'status' },
    { value: 'actions', text: '' },
  ],
  modal: {
    visible: false,
    data: {},
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
export { state, actions, mutations };
