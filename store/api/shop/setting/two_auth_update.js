import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP TWO AUTH UPDATE`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/shop/two_auth',
  },
});
