import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY TWO AUTH DELETE`,
  defaultValue: {},
  axiosConfig: {
    method: 'delete',
    url: '/v1/my/two_auth',
  },
});
