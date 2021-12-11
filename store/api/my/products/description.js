import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT DESCRIPTION UPDATE`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/my/products/{id}',
  },
  handlers: {
    combineParams({ id, ...data }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id), data };
    },
  },
});
