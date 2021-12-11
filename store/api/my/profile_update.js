import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PROFILE UPDATE`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/my/profile',
  },
});
