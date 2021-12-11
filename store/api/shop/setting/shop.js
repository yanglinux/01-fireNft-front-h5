import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP DETAIL`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/shop',
  },
});
