import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP PRODUCT EDIT`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/shop/products',
  },
  handlers: {
    combineParams(formdata, { url, ...axiosConfig }) {
      return { ...axiosConfig, url: `${url}/${formdata.get('id')}`, data: formdata };
    },
  },
});
