import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP REPLACEMENT DETAIL`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/replacements/{id}',
  },
  handlers: {
    combineParams({ id }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id) };
    },
  },
});
