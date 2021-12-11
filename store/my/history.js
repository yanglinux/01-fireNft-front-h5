const state = () => ({
  modal: {
    visible: false,
    id: null,
    title: null,
    description: null,
    image_url: null,
    order_id: null,
    pay_method: null,
    payment_due_at: null,
    amount: null,
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
