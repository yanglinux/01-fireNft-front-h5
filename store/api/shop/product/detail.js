import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP PRODUCT DETAIL`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/products',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: `${url}/${id}` };
    },
  },
});
