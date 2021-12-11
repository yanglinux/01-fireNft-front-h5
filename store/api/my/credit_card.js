import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY CREDIT CARD`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/credit_card',
  },
});
