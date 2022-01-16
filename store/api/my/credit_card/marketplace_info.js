import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY CREDIT CARD MARKETPLACE`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/credit_card/marketplace',
  },
});
