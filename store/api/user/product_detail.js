import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `PRODUCT DETAIL`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/products/{id}',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
