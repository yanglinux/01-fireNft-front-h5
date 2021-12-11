import { vueAjaxManager as ajaxManager } from '@/plugins/axios';
export default ajaxManager.create({
  name: `PRODUCT LIST`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/products',
  },
});
