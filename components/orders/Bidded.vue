<template>
  <div>
    <v-data-table
      disable-sort
      fixed-header
      hide-default-footer
      mobile-breakpoint="0"
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="25"
      class="elevation-1 custom mt-2"
    >
      <template #no-data>
        {{ $t('titles.no_data') }}
      </template>
      <template #item.created_at="row">
        {{ row.item.created_at | date }}
      </template>
      <template #item.status="row">
        <div class="d-flex align-center">
          <v-btn
            :loading="onLoadingItem === row.item.id && biddedDetailLoading"
            @click="onClick(row)"
            v-if="statusButtonVisible(row.item.status)"
            color="primary"
            small
            class="mr-2"
          >
            詳細
          </v-btn>
          <span :class="row.item.status">{{ $t(`my.order.bidded.status.${row.item.status}`) }}</span>
        </div>
      </template>
      <template #item.payment_due_at="row">
        {{ row.item.payment_due_at | date }}
      </template>
      <template #item.amount="row">
        {{ row.item.amount | money($t('my.order.append.amount_unit')) }}
      </template>
    </v-data-table>
    <v-pagination
      circle
      :disabled="loading"
      @input="updatePage"
      :value="paging.current_page || 1"
      :length="paging.total_pages"
    ></v-pagination>

    <MyOrdersModalsDetail :visible="visible && modalDetail" @hide="modalDetail = false" :item="biddedDetailData" />
    <MyOrdersModalsPayment
      :visible="modalPayment && visible"
      @hide="hidePayment"
      :item="biddedDetailData"
      @ok="onTransferred"
    />
    <ConfirmDialog
      :visible="modalConfirm && visible"
      :okText="$t('buttons.confirm')"
      :loading="transferLoading"
      @hide="hideTransferred"
      @ok="onTransfer"
      :text="$t('message.info_transfer_completion')"
    />

    <MyOrdersModalsPay :item="modalPay" @close="modalPay = null" @ok="onOrderPayOk" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import myorders from '@/utils/myorders';

export default {
  mixins: [myorders('bidded')],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      modalPay: null,
    };
  },
  watch: {},
  computed: {
    ...mapState({
      items: (state) => state.api.my.orders.bidded.data?.result || [],
      paging: (state) => state.api.my.orders.bidded.data?.paging || {},
      loading: (state) => state.api.my.orders.bidded.onFetch,
    }),
    headers() {
      return [
        { value: 'created_at', text: this.$t('my.order.bidded.fields.created_at') },
        { value: 'product.title', text: this.$t('my.order.bidded.fields.title'), width: 130 },
        { value: 'seller.name', text: this.$t('my.order.bidded.fields.name') },
        { value: 'status', text: this.$t('my.order.bidded.fields.status') },
        { value: 'payment_due_at', text: this.$t('my.order.bidded.fields.payment_due_at') },
        { value: 'amount', text: this.$t('my.order.bidded.fields.amount') },
      ];
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.request();
    }
  },
  methods: {
    ...mapActions({
      request: 'api/my/orders/bidded/request',
    }),
    updatePage(page) {
      this.request({ page });
    },
    onClick(row) {
      console.log(row.item.status);
      if (row.item.status === 'waiting_confirm') {
        this.modalPay = row.item;
      } else {
        this.showModal(row);
      }
    },
    onOrderPayOk() {
      this.modalPay = null;
      this.request();
    },
  },
};
</script>

<style lang="scss" scoped>
span.paid {
  color: #05ce05;
}

span.transferred {
  color: #ffc107;
}

span.waiting_payment,
span.cancel {
  color: #dc3545;
}

span.replacemented {
  color: #0dcaf0;
}

span.waiting_confirm {
  color: #6c757d;
}
</style>
