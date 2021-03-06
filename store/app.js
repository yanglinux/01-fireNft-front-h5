const state = () => ({
  language: localStorage.getItem('language') || 'ja',
  layout: {
    title: 'FIRE DIGITAL NFT',
    miniVariant: false,
    drawer: false,
    clipped: false,
    fixed: false,
    rightDrawer: false,
    right: true,
    rightDrawer: false,
  },
});

const actions = {
  setLanguage({ commit }, lang) {
    commit('setLanguage', lang);
  },
  setLayout({ commit }, data) {
    commit('setLayout', data);
  },
};

const mutations = {
  setLanguage(state, lang) {
    localStorage.setItem('language', lang);
    state.language = lang;
  },
  setLayout(state, [name, value]) {
    state.layout[name] = value;
  },
};

export { state, actions, mutations };
