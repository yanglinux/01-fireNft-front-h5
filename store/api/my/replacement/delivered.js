import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT REPLACEMENT ADD`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/my/replacements/{id}/delivered',
  },
  handlers: {
    combineParams(data, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', data.id) };
    },
  },
});
