import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT SOLD`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/products/sold',
  },
});
