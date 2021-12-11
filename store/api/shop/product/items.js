import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP PRODUCT ITEMS`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/products',
  },
});
