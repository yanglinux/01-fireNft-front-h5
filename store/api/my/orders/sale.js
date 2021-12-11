import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY ORDERS SALE`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/orders/sale',
  },
});
