import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY BANK INFO`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/bank_info',
  },
});
