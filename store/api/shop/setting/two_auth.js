import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP TWO AUTH INFO`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/two_auth',
  },
});
