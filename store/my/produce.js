const defaultForm = () => ({
  price_type: 'auction',
  product_id: null,
  fixed_price: null,
  start_price: null,
  bid_unit: null,
  bid_days: null,
});

const state = () => ({
  modal: {
    visible: false,
    title: '',
    image: '',
  },
  saleModal: {
    id: null,
    visible: false,
  },
  editModal: {
    id: null,
    description: '',
    visible: false,
  },
  form: defaultForm(),
  steps: [
    {
      title: 'product_type_setting',
    },
    {
      title: 'detail_setting',
    },
    {
      title: 'confirm',
    },
  ],
});

const actions = {
  setForm({ commit }, data) {
    commit('setForm', data);
  },
  setModal({ commit }, data) {
    commit('setModal', data);
  },
  setSaleModal({ commit }, data) {
    commit('setSaleModal', data);
  },
  setEditModal({ commit }, data) {
    commit('setEditModal', data);
  },
  resetForm({ commit }) {
    commit('resetForm');
  },
};

const mutations = {
  setForm(state, [name, value]) {
    state.form[name] = value;
  },
  setModal(state, data) {
    state.modal = data;
  },
  setSaleModal(state, data) {
    state.saleModal = data;
  },
  setEditModal(state, data) {
    state.editModal = {
      ...state.editModal,
      ...data,
    };
  },
  resetForm(state) {
    state.form = {
      ...defaultForm(),
      price_type: state.form.price_type,
    };
  },
};

export { state, actions, mutations };
