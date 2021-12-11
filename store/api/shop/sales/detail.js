import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP SALES ITEM DETAIL`,
  defaultValue: [],
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/products/{product_id}/exhibits',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{product_id}', id) };
    },
  },
});
