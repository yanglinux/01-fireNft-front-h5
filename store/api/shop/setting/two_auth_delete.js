import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP TWO AUTH DELETE`,
  defaultValue: {},
  axiosConfig: {
    method: 'delete',
    url: '/v1/shop/two_auth',
  },
});
