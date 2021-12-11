import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP SALES CREATE`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/shop/exhibits',
  },
});
