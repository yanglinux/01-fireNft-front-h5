import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT LISTING`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/products/listing',
  },
});
