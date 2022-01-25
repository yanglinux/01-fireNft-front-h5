import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY CREDIT CARD PAYOUT`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/credit_card/payout',
  },
});
