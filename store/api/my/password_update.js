import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PASSWORD PATCH`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/my/password',
  },
});
