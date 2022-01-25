import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY ORDERS FIXED PRICE DETAIL`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/orders/fixed_price/{id}',
  },
  handlers: {
    combineParams({ id, ...params }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id), params };
    },
  },
});
