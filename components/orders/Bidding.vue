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
      <template #item.last_bidded_at="row">
        {{ row.item.last_bidded_at | date }}
      </template>
      <template #item.seller.name="row">
        <nuxt-link :to="sellerlink(row)">{{ row.item.seller.name }}</nuxt-link>
      </template>
      <template #item.status="row">
        <nuxt-link :to="'/products/' + row.item.product.id">
          <span :class="row.item.status">
            {{
              $t(
                `my.order.bidding.status.${
                  row.item.status === 'listing' && row.item.is_top_bidded ? 'top_bidded' : row.item.status
                }`
              )
            }}
          </span>
        </nuxt-link>
      </template>
      <template #item.current_price="row">
        {{ row.item.current_price | money($t('my.order.append.amount_unit')) }}
      </template>
    </v-data-table>
    <v-pagination
      circle
      :disabled="loading"
      @input="updatePage"
      :value="paging.current_page || 1"
      :length="paging.total_pages"
    ></v-pagination>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data: function () {
    return {};
  },
  watch: {},
  computed: {
    ...mapState({
      items: (state) => state.api.my.orders.bidding.data?.result || [],
      paging: (state) => state.api.my.orders.bidding.data?.paging || {},
      loading: (state) => state.api.my.orders.bidding.onFetch,
    }),
    headers() {
      return [
        { value: 'last_bidded_at', text: this.$t('my.order.bidding.fields.last_bidded_at') },
        { value: 'product.title', text: this.$t('my.order.fixed_price.fields.title'), width: 130 },
        { value: 'seller.name', text: this.$t('my.order.fixed_price.fields.name') },
        { value: 'status', text: this.$t('my.order.fixed_price.fields.status') },
        { value: 'current_price', text: this.$t('my.order.bidding.fields.current_price') },
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
      request: 'api/my/orders/bidding/request',
    }),
    updatePage(page) {
      this.request({ page });
    },
    sellerlink({ item }) {
      const page = item.seller.seller_type === 'User' ? '/users/' : '/shops/';
      return page + item.seller.name;
    },
  },
};
</script>

<style scoped>
span.listing {
  color: #05ce05;
}

span.canceled,
span.churn {
  color: #dc3545;
}

span.bidded {
  color: #0dcaf0;
}

span.created {
  color: #6c757d;
}
</style>
