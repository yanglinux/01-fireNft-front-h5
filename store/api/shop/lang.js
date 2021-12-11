import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP LANG`,
  defaultValue: {},
  axiosConfig: {
    method: 'put',
    url: '/v1/shop/lang',
  },
});
