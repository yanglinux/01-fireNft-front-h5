import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT SET EXHIBIT EXAMINATION`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/my/exhibit_examination',
  },
});
