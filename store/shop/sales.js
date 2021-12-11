const state = () => ({
  fields: [
    { value: 'title', text: 'product_name' },
    { value: 'id', text: 'product_code' },
    {
      value: 'cover_image_url',
      text: 'cover_image_url',
    },
    { value: 'created_at', text: 'created_at' },
    { value: 'category.name', text: 'category_name' },
    { value: 'price', text: 'fixed_price' },
    { value: 'total', text: 'total' },
    { value: 'status', text: 'sale_status' },
    { value: 'actions', text: '' },
  ],
  detail: {
    fields: [
      { value: 'start_at', text: 'start_at' },
      { value: 'end_at', text: 'end_at' },
      { value: 'price_type', text: 'price_type' },
      { value: 'price', text: 'price' },
    ],
  },
  modal: {
    visible: false,
    data: {},
  },
  modalCreate: {
    visible: false,
    data: {},
  },
});

const actions = {
  setModal({ commit }, data) {
    commit('setModal', data);
  },
  setModalCreate({ commit }, data) {
    commit('setModalCreate', data);
  },
};

const mutations = {
  setModal(state, data) {
    state.modal = data;
  },
  setModalCreate(state, data) {
    state.modalCreate = data;
  },
};

export { state, actions, mutations };
