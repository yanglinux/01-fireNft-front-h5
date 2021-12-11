import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP SALES ITEMS`,
  defaultValue: [],
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/exhibits',
  },
});
