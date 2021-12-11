import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

const actions = {
  updateDescription({ commit, state }, item) {
    const { id, description } = item;
    const result = state.data.result || [];
    if (result.length) {
      const index = result.findIndex((x) => x.id === id);
      commit('updateDescriptionByIndex', { index, description });
    }
  },
};

const mutations = {
  updateDescriptionByIndex(state, { index, description }) {
    state.data.result[index] = {
      ...state.data.result[index],
      description,
    };

    state.data.result = [...state.data.result];
  },
};

export default ajaxManager.create({
  name: `MY PRODUCT NOT LISTED`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/products/not_listed',
  },
  vuex: {
    actions,
    mutations,
  },
});
