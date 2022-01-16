import { mapState, mapActions } from 'vuex';

export default (page = '') => ({
  data: function () {
    return {
      modalDetail: false,
      modalPayment: false,
      modalConfirm: false,
      onLoadingItem: null,
      page,
    };
  },
  watch: {
    transferLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.transferError && this.visible) {
          this.toast({
            text: this.transferMessage.join('<br />'),
            type: 'error',
          });
        } else {
          this.hideTransferred();
          this.hidePayment();
          if (this.page === 'fixed_price') this.requestFixedPriceItems();
          else if (this.page === 'bidded') this.requestBiddedItems();
          else if (this.page === 'sale') this.requestSaleItems();
        }
      }
    },
    detailLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.visible) {
          const { status } = this.detailData;
          if (['transferred', 'paid'].includes(status)) {
            this.modalDetail = true;
          } else {
            this.modalPayment = true;
          }
        }
      }
    },
    biddedDetailLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.visible) {
          const { status } = this.biddedDetailData;
          if (['transferred', 'paid'].includes(status)) {
            this.modalDetail = true;
          } else {
            this.modalPayment = true;
          }
        }
      }
    },
    soldLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.visible) {
          const { status } = this.soldData;
          if (['transferred', 'paid'].includes(status)) {
            this.modalDetail = true;
          } else {
            this.modalPayment = true;
          }
        }
      }
    },
  },
  computed: {
    ...mapState({
      detailLoading: (state) => state.api.my.orders.fixed_price.detail.onFetch,
      detailData: (state) => state.api.my.orders.fixed_price.detail.data,
      biddedDetailLoading: (state) => state.api.my.orders.bidded.detail.onFetch,
      biddedDetailData: (state) => state.api.my.orders.bidded.detail.data,
      soldLoading: (state) => state.api.my.orders.sold.detail.onFetch,
      soldData: (state) => state.api.my.orders.sold.detail.data,
      transferLoading: (state) => state.api.my.orders.transfer.onFetch,
      transferError: (state) => state.api.my.orders.transfer.error,
      transferMessage: (state) => state.api.my.orders.transfer.data?.errors || [],
    }),
    statusButtonVisible() {
      const condition = ['waiting_confirm', 'waiting_payment', 'transferred', 'paid'];
      return (status) => {
        return condition.includes(status);
      };
    },
  },
  methods: {
    ...mapActions({
      requestDetail: 'api/my/orders/fixed_price/detail/request',
      requestBiddedDetail: 'api/my/orders/bidded/detail/request',
      requestSoldDetail: 'api/my/orders/sold/detail/request',
      requestTransfer: 'api/my/orders/transfer/request',
      requestFixedPriceItems: 'api/my/orders/fixed_price/request',
      requestBiddedItems: 'api/my/orders/bidded/request',
      requestSaleItems: 'api/my/orders/sale/request',
      toast: 'toast/add',
    }),
    onTransferred() {
      this.modalConfirm = true;
    },
    hideTransferred() {
      this.modalConfirm = false;
    },
    hidePayment() {
      this.modalPayment = false;
    },
    onTransfer() {
      let id = this.detailData.id;
      if (this.page === 'bidded') {
        id = this.biddedDetailData.id;
      }
      this.requestTransfer({
        id,
      });
    },
    showModal({ item }) {
      this.onLoadingItem = item.id;
      if (this.page === 'sale') {
        this.requestSoldDetail({ id: item.id });
      } else {
        if (item.price_type === 'auction') {
          this.requestBiddedDetail({ id: item.id });
        } else {
          this.requestDetail({ id: item.id });
        }
      }
    },
  },
});
