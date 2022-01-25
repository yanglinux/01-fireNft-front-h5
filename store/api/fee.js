import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SERVICE FEE`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/service_fee',
  },
});
