import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `PRODUCT FAVORITE TOP LIST`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shops/{id}',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
