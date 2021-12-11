import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP BANK INFO`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/bank_info',
  },
});
