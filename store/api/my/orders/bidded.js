import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY ORDERS BIDDED`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/orders/bidded',
  },
});
