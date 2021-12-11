import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT BID`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/exhibits/{id}/bids',
  },
  handlers: {
    combineParams({ id, ...data }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id), data };
    },
  },
});
