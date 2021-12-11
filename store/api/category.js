import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `CATEGORY ITEMS`,
  defaultValue: [],
  axiosConfig: {
    method: 'get',
    url: '/v1/categories',
  },
});
