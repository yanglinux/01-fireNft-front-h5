const state = () => ({
  fields: [
    { value: 'title', text: 'product_name' },
    {
      value: 'cover_image_url',
      text: 'cover_image_url',
    },
    { value: 'created_at', text: 'created_at' },
    { value: 'category_name', text: 'category_name' },
    { value: 'id', text: 'id' },
    { value: 'total', text: 'total' },
    { value: 'status', text: 'nft_status' },
    { value: 'actions', text: '' },
  ],
  modalEdit: {
    id: null,
    visible: false,
  },
});

const actions = {
  setModalEdit({ commit }, data) {
    commit('setModalEdit', data);
  },
};

const mutations = {
  setModalEdit(state, data) {
    state.modalEdit = data;
  },
};

export { state, actions, mutations };
