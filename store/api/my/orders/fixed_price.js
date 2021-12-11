import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY ORDERS FIXED PRICE`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/orders/fixed_price',
  },
});
