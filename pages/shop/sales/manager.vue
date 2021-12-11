<template>
  <div>
    <ShopSalesSearch />
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
        <span :class="row.item.status">{{ $t(`product.status.${getStatus(row.item)}`) }}</span>
      </template>
      <template #item.price="row">{{ getCurrentPrice(row.item) }}{{ $t('append.amount_unit') }}</template>
      <template #item.created_at="row">
        {{ row.item.created_at | date }}
      </template>
      <template #item.cover_image_url="row">
        <img :src="row.item.cover_image_url" class="ma-2" />
      </template>
      <template #item.actions="row">
        <v-btn @click="createSale(row)" v-if="buttonSaleVisiable(row)" class="ma-2" color="primary">
          {{ $t('buttons.create_sale') }}
        </v-btn>
        <v-btn @click="cancelSaleModal = row.item" v-if="buttonSaleCancelVisiable(row)" class="ma-2" color="primary">
          {{ $t('buttons.cancel_sale') }}
        </v-btn>
        <v-btn @click="openDetail(row)" class="ma-2" color="primary">
          {{ $t('buttons.detail') }}
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      :disabled="loading"
      @input="updatePage"
      :value="paging.current_page || 1"
      :length="Math.ceil(paging.total_count / paging.per_page) || 1"
    ></v-pagination>
    <ShopSalesDetail v-if="modalDetail.data.id" />
    <ShopSalesCreate />

    <v-dialog :value="!!cancelSaleModal" transition="dialog-bottom-transition" persistent width="80vw">
      <v-card>
        <v-card-text class="pa-4">
          <div class="text-h6">{{ $t('titles.ask_for_cancel_sale') }}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="cancelLoading" text @click="cancelSaleModal = null">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :loading="cancelLoading" color="primary" @click="cancelSale">{{ $t('buttons.ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  layout: 'shop',
  components: {},
  data: () => ({
    cancelSaleModal: null,
  }),
  watch: {
    cancelLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.cancelRes.data.errors) {
          this.toast({ text: this.cancelRes.data.errors[0], type: 'error' });
        } else {
          this.cancelSaleModal = null;
          this.getItems();
        }
      }
    },
  },
  computed: {
    ...mapState({
      items: (state) => state.api.shop.sales.items.data?.result || [],
      paging: (state) => state.api.shop.sales.items.data?.paging || {},
      loading: (state) => state.api.shop.sales.items.onFetch,
      fields: (state) => state.shop.sales.fields,
      cancelLoading: (state) => state.api.shop.sales.cancel.onFetch,
      cancelRes: (state) => state.api.shop.sales.cancel,
      modalDetail: (state) => state.shop.sales.modal,
    }),
    headers() {
      return [...this.fields].map(({ value, text }) => {
        return { value, text: text ? this.$t(`titles.${text}`) : '' };
      });
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.getItems({});
    }
  },
  methods: {
    ...mapActions({
      getItems: 'api/shop/sales/items/request',
      requestCancelNFT: 'api/shop/sales/cancel/request',
      setModal: 'shop/sales/setModal',
      setModalCreate: 'shop/sales/setModalCreate',
      toast: 'toast/add',
    }),
    getStatus({ exhibit }) {
      return exhibit ? exhibit.status : 'created';
    },
    getCurrentPrice({ exhibit }) {
      let price = null;
      if (exhibit) {
        const { price_type, current_price, fixed_price } = exhibit;
        price = price_type === 'auction' ? current_price : fixed_price;
      }
      return price;
    },
    updatePage(page) {
      this.getItems({ page });
    },
    openDetail({ item }) {
      this.setModal({ visible: true, data: item });
    },
    hidden() {
      this.setModal({ visible: false, data: {} });
    },
    onChange(page) {
      this.getItems({ page });
    },
    toPageAdd() {
      this.$router.push('/shop/product/add');
    },
    toPageDetail(id) {
      this.$router.push(`/shop/product/detail/${id}`);
    },
    buttonSaleVisiable({ item }) {
      return !item.exhibit || item.exhibit.status === 'canceled';
    },
    buttonSaleCancelVisiable({ item }) {
      return item.exhibit && item.exhibit.status === 'listing';
    },
    cancelSale() {
      this.requestCancelNFT({
        id: this.cancelSaleModal.exhibit.id,
      });
    },
    createSale({ item }) {
      this.setModalCreate({ visible: true, data: item });
    },
  },
};
</script>

<style scoped>
.cover {
  width: 100px;
  height: auto;
}

.w150 {
  width: 150px;
}

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
