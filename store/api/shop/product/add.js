import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP PRODUCT ADD`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/shop/products',
  },
});
