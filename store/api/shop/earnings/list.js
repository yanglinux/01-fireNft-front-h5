import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP EARNINGS LIST`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/sales',
  },
});
