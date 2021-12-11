import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP EARNINGS CSV DOWNLOAD`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/sales_export',
  },
});
