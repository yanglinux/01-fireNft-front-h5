import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `USER AUTH RESET PASSWORD`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/auth/password',
  },
});
