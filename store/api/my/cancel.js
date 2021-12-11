import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT SALE CANCEL`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/my/exhibits/{id}/canceled',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
