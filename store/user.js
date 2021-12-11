const defaultState = () => ({
  currentUser: {},
  twoAuth: false,
});

export const state = () => defaultState();

export const mutations = {
  RESET_STORE: (state) => {
    Object.assign(state, defaultState());
  },

  SET_AUTH_USER: (state, { authUser }) => {
    state.currentUser = {
      uid: authUser.uid,
      email: authUser.email,
      displayName: authUser.displayName,
      name: authUser.name,
      photoURL: authUser.photoURL,
      introduction: authUser.introduction,
      facebook: authUser.facebook,
      twitter: authUser.twitter,
      instagram: authUser.instagram,
    };
  },

  SET_TWO_AUTH: (state, val) => {
    state.twoAuth = val;
  },
  setAuthUser(state, value) {
    state.currentUser = { ...value };
  },
};

export const actions = {
  async onAuthStateChanged({ commit }, { authUser }) {
    if (!authUser) {
      commit('RESET_STORE');
      return;
    }

    if (authUser && authUser.getIdToken) {
      try {
        await authUser.getIdToken(true);
      } catch (e) {
        console.error(e);
      }
    }

    commit('SET_AUTH_USER', { authUser });
  },
  setAuthUser({ commit }, authUser) {
    commit('setAuthUser', authUser);
  },
  setTwoAuth({ commit }, actived) {
    commit('SET_TWO_AUTH', actived);
  },
  resetStore({ commit }) {
    commit('RESET_STORE');
  },
};
