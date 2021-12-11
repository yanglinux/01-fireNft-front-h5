import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `USER SIGNUP`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/auth',
  },
});
