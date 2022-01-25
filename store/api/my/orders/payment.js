import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY ORDERS PAYMENT`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/my/orders/{id}/payment',
  },
  handlers: {
    combineParams({ id, ...data }, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: url.replace('{id}', id), data };
    },
  },
});
