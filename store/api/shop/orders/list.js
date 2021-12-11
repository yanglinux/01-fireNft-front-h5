import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP ORDERS LIST`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/orders',
  },
});
