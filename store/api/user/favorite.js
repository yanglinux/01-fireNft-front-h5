import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `PRODUCT FAVORITE`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/products/{id}/favorite',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
