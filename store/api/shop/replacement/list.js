import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP REPLACEMENT LIST`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/replacements',
  },
});
