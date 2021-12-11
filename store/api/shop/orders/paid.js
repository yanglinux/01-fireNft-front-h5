import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP ORDERS PAID`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/shop/orders/{id}/paid',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
