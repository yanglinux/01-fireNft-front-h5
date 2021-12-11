<template>
  <div>
    <ShopReplacementSearch />
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
      <template #item.updated_at="row">
        {{ row.item.updated_at | date }}
      </template>
      <template #item.status="row">
        {{ $t(`deliver.${row.item.status}`) }}
      </template>
      <template #item.product.status="row">
        {{ $t(`product.nft.status.${row.item.product.status}`) }}
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
    <ShopReplacementDetail />
    <ShopReplacementSend />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  layout: 'shop',
  computed: {
    ...mapState({
      items: (state) => state.api.shop.replacement.list.data?.result || [],
      fields: (state) => state.shop.replacement.list.fields,
      paging: (state) => state.api.shop.replacement.list.data?.paging || {},
      loading: (state) => state.api.shop.replacement.list.onFetch,
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
      request: 'api/shop/replacement/list/request',
      setModal: 'shop/replacement/list/setModal',
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
