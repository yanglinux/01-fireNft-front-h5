import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `MY PRODUCT CONTACTS SEND`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/my/contacts',
  },
});
