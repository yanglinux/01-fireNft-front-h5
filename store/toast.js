const state = () => ({
  option: {
    text: '',
    icon: null,
    position: 'top-right',
    duration: 5000,
    keepOnHover: false,
    fullWidth: false,
    className: 'my-toasted',
  },
  data: {},
});

const actions = {
  add({ commit }, data) {
    commit('add', data);
  },
};

const mutations = {
  add(state, data) {
    state.data = { ...state.option, ...data };
  },
};

export default { state, actions, mutations };
