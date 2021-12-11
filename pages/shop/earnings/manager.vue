<template>
  <div>
    <ShopEarningsTop />
    <ShopEarningsSearch />
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
      <template #item.status="row">
        <span :class="row.item.status">{{ $t(`earnings.status.${row.item.status}`) }}</span>
      </template>
      <template #item.created_at="row">
        {{ row.item.created_at | date }}
      </template>
      <template #item.actions="row">
        <v-btn color="primary" @click="setModal({ visible: true, data: row.item })">
          {{ $t('buttons.detail_confirm') }}
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      :disabled="loading"
      @input="updatePage"
      :value="paging.current_page || 1"
      :length="Math.ceil(paging.total_count / paging.per_page) || 1"
    ></v-pagination>
    <ShopEarningsDetail />
    <ShopEarningsMonth />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  layout: 'shop',
  computed: {
    ...mapState({
      items: (state) => state.api.shop.earnings.list.data?.result || [],
      fields: (state) => state.shop.earnings.fields,
      paging: (state) => state.api.shop.earnings.list.data?.paging || {},
      loading: (state) => state.api.shop.earnings.list.onFetch,
    }),
    headers() {
      return [...this.fields].map(({ value, text }) => {
        return { value, text: text ? this.$t(`titles.${text}`) : '' };
      });
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.request();
    }
  },
  methods: {
    ...mapActions({
      request: 'api/shop/earnings/list/request',
      setModal: 'shop/earnings/setModal',
    }),
    updatePage(page) {
      this.request({ page });
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
