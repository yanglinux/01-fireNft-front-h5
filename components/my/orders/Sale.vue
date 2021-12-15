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
        {{ row.item.created_at | formatDateTime }}
      </template>
      <template #item.buyer.name="row">
        <nuxt-link :to="buyerlink(row)">{{ row.item.buyer.name }}</nuxt-link>
      </template>
      <template #item.price_type="row">
        {{ $t(`my.order.labels.price_type_${row.item.price_type}`) }}
      </template>
      <template #item.status="row">
        <span :class="row.item.status">{{ $t(`my.order.sale.status.${row.item.status}`) }}</span>
      </template>
      <template #item.payment_due_at="row">
        {{ row.item.payment_due_at | formatDateTime }}
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
        { value: 'price_type', text: this.$t('my.order.sale.fields.price_type') },
        { value: 'created_at', text: this.$t('my.order.sale.fields.created_at') },
        { value: 'product.title', text: this.$t('my.order.sale.fields.title') },
        { value: 'buyer.name', text: this.$t('my.order.sale.fields.name') },
        { value: 'status', text: this.$t('my.order.sale.fields.status') },
        { value: 'amount', text: this.$t('my.order.sale.fields.amount') },
      ],      
    };
  },
  filters: {    
    formatDateTime: function(value) {
      if (value == null) {
        return '';
      }
      let date = new Date(value);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? '0' + MM : MM;
      let d = date.getDate();
      d = d < 10 ? '0' + d : d;
      let h = date.getHours();
      h = h < 10 ? '0' + h : h;
      let m = date.getMinutes();
      m = m < 10 ? '0' + m : m;
      let s = date.getSeconds();
      s = s < 10 ? '0' + s : s;
      return y + '/' + MM + '/' + d + ' ' + h + ':' + m + ':' + s;
    },
  },
  watch: {},
  computed: {
    ...mapState({
      items: (state) => state.api.my.orders.sale.data?.result || [],
      paging: (state) => state.api.my.orders.sale.data?.paging || {},
      loading: (state) => state.api.my.orders.sale.onFetch,
    }),
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
