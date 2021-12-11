import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP SALES CANCEL`,
  defaultValue: {},
  axiosConfig: {
    method: 'POST',
    url: '/v1/shop/exhibits/{id}/canceled',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
