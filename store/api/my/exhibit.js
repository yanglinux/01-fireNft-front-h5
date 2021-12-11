import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT EXHIBIT`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/my/exhibits',
  },
});
