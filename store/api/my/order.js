import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT ORDER PAYMENT`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/products/{id}/orders',
  },
  handlers: {
    combineParams({ id, ...data }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id), data };
    },
  },
});
