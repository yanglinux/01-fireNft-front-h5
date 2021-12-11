import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY TWO AUTH`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/two_auth',
  },
});
