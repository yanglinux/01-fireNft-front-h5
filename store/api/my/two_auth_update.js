import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY TWO AUTH PATCH`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/my/two_auth',
  },
});
