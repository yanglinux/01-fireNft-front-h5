import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `USER PRODUCT HOT ORDER`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/top',
  },
});
