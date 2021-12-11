<template>
  <v-dialog :value="modal.visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-card-text class="pa-4">
        <ListItem :left="$t('titles.price_type')" :right="$t(`product.type.${detail.price_type}`)" />
        <template v-if="isFixedPrice">
          <ListItem :left="$t('titles.sale_price')" :right="detail.fixed_price + $t('append.amount_unit')" />
        </template>
        <template v-else>
          <ListItem :left="$t('titles.start_price')" :right="detail.start_price + $t('append.amount_unit')" />
          <ListItem :left="$t('titles.bid_days')" :right="detail.bid_days + $t('titles.day')" />
          <ListItem :left="$t('titles.bid_unit')" :right="detail.bid_unit + $t('append.amount_unit')" />
        </template>
      </v-card-text>
      <v-card-text class="pa-2">
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
          <template #item.price="row">{{ getCurrentPrice(row.item) }}{{ $t('append.amount_unit') }}</template>
          <template #item.start_at="row">
            {{ row.item.start_at | date }}
          </template>
          <template #item.end_at="row">
            {{ row.item.end_at | date }}
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="closeModal">{{ $t('buttons.ok') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  computed: {
    ...mapState({
      items: (state) => state.api.shop.sales.detail.data?.exhibits || [],
      loading: (state) => state.api.shop.sales.detail.onFetch,
      detail: (state) => state.api.shop.sales.detail.data?.current_exhibit || {},
      fields: (state) => state.shop.sales.detail.fields,
      modal: (state) => state.shop.sales.modal,
    }),
    isFixedPrice() {
      return this.detail?.price_type === 'fixed_price';
    },
    headers() {
      return [...this.fields].map(({ value, text }) => {
        return { value, text: text ? this.$t(`titles.${text}`) : '' };
      });
    },
  },
  methods: {
    ...mapActions({
      getDetail: 'api/shop/sales/detail/request',
      setModal: 'shop/sales/setModal',
    }),
    closeModal() {
      this.setModal({ visible: false, data: {} });
    },
    getCurrentPrice({ price_type, fixed_price, current_price, start_price }) {
      return price_type === 'fixed_price' ? fixed_price : current_price || start_price;
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.getDetail({ id: this.modal.data.id });
    }
  },
};
</script>

<style scoped></style>
