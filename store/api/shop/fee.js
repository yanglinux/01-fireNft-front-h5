import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP SERVICE FEE`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/service_fee',
  },
});
