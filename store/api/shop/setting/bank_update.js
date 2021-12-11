import { ajaxManager } from '@/plugins/axios';

export default ajaxManager.create({
  name: `SHOP BANK INFO UPDATE`,
  defaultValue: {},
  axiosConfig: {
    method: 'patch',
    url: '/v1/shop/bank_info',
  },
});
