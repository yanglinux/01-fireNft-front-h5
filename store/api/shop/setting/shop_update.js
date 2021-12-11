import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP DETAIL UPDATE`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/shop/shop',
  },
});
