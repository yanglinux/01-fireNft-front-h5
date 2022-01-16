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
      <template #item.buyer.name="row">
        <nuxt-link :to="buyerlink(row)">{{ row.item.buyer.name }}</nuxt-link>
      </template>
      <template #item.price_type="row">
        {{ $t(`my.order.labels.price_type_${row.item.price_type}`) }}
      </template>
      <template #item.status="row">
        <div class="d-flex align-center" v-if="row.item.status">
          <v-btn
            :loading="onLoadingItem === row.item.id && soldLoading"
            @click="showModal(row)"
            v-if="statusButtonVisible(row.item.status)"
            color="primary"
            small
            class="mr-2"
          >
            詳細
          </v-btn>
          <span :class="row.item.status">{{ $t(`my.order.sale.status.${row.item.status}`) }}</span>
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

    <MyOrdersModalsDetail :visible="visible && modalDetail" @hide="modalDetail = false" :item="soldData" />
    <MyOrdersModalsPayment :visible="modalPayment && visible" @hide="modalPayment = false" :item="soldData" okonly />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';
import myorders from '@/utils/myorders';

export default {
  mixins: [myorders('sale')],
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {};
  },
  watch: {},
  computed: {
    ...mapState({
      items: (state) => state.api.my.orders.sale.data?.result || [],
      paging: (state) => state.api.my.orders.sale.data?.paging || {},
      loading: (state) => state.api.my.orders.sale.onFetch,
    }),
    headers() {
      return [
        { value: 'price_type', text: this.$t('my.order.sale.fields.price_type'), width: 130 },
        { value: 'created_at', text: this.$t('my.order.sale.fields.created_at') },
        { value: 'product.title', text: this.$t('my.order.sale.fields.title'), width: 130 },
        { value: 'buyer.name', text: this.$t('my.order.sale.fields.name') },
        { value: 'status', text: this.$t('my.order.sale.fields.status') },
        { value: 'amount', text: this.$t('my.order.sale.fields.amount') },
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
      request: 'api/my/orders/sale/request',
    }),
    updatePage(page) {
      this.request({ page });
    },
    buyerlink({ item }) {
      const page = item.buyer.buyer_type === 'User' ? '/users/' : '/shops/';
      return page + item.buyer.name;
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
