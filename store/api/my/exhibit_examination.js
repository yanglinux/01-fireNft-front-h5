import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT EXHIBIT EXAMINATION`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/exhibit_examination',
  },
});
