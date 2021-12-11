import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP PRODUCT NFT CANCEL`,
  defaultValue: {},
  axiosConfig: {
    method: 'delete',
    url: '/v1/shop/products/{id}/requested',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
