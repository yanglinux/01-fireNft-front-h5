import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP REPLACEMENT SENT`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/shop/replacements/{id}/sent',
  },
  handlers: {
    combineParams(data, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', data.id), data };
    },
  },
});
