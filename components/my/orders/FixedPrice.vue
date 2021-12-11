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
        <span :class="row.item.status">{{ $t(`my.order.fixed_price.status.${row.item.status}`) }}</span>
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
      :length="Math.ceil(paging.total_count / paging.per_page) || 1"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data: function () {
    return {
      headers: [
        { value: 'created_at', text: this.$t('my.order.fixed_price.fields.created_at') },
        { value: 'product.title', text: this.$t('my.order.fixed_price.fields.title') },
        { value: 'seller.name', text: this.$t('my.order.fixed_price.fields.name') },
        { value: 'status', text: this.$t('my.order.fixed_price.fields.status') },
        { value: 'payment_due_at', text: this.$t('my.order.fixed_price.fields.payment_due_at') },
        { value: 'amount', text: this.$t('my.order.fixed_price.fields.amount') },
      ],
    };
  },
  watch: {},
  computed: {
    ...mapState({
      items: (state) => state.api.my.orders.fixed_price.data?.result || [],
      paging: (state) => state.api.my.orders.fixed_price.data?.paging || {},
      loading: (state) => state.api.my.orders.fixed_price.onFetch,
    }),
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.request();
    }
  },
  methods: {
    ...mapActions({
      request: 'api/my/orders/fixed_price/request',
    }),
    updatePage(page) {
      this.request({ page });
    },
  },
};
</script>
