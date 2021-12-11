import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP EARNINGS MONTHLY SALES`,
  defaultValue: {},
  axiosConfig: {
    method: 'get',
    url: '/v1/shop/monthly_sales',
  },
});
