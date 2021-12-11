import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT REPLACEMENT LIST`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/my/replacements',
  },
});
