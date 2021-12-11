import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PROFILE`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/profile',
  },
});
