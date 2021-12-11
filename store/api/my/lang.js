import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY LANG`,
  defaultValue: {},
  axiosConfig: {
    method: 'put',
    url: '/v1/my/lang',
  },
});
