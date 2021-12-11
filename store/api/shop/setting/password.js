import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP UPDATE PASSWORD`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/shop/password',
  },
});
