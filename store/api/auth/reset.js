import { vueAjaxManager as ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `USER AUTH RESET PASSWORD CALLBACK`,
  defaultValue: {},
  axiosConfig: {
    method: 'post',
    url: '/v1/auth/password',
  },
  handlers: {
    combineParams({ header, ...data }, { url, ...axiosConfig }) {
      return { ...axiosConfig, data, header };
    },
  },
});
