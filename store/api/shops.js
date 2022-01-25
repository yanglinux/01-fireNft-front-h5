import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOPS DETAIL`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shops/{id}',
  },
  handlers: {
    combineParams({ id, ...params }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id), params };
    },
  },
});
