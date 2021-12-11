<template>
  <div>
    <ShopOrdersSearch />
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
        <span :class="row.item.status">{{ $t(`orders.status.${row.item.status}`) }}</span>
      </template>
      <template #item.created_at="row">
        {{ row.item.created_at | date }}
      </template>
      <template #item.product_id="row">
        {{ row.item.product.id }}
      </template>
      <template #item.product_name="row">
        {{ row.item.product.title }}
      </template>
      <template #item.pay_method="row">
        {{ $t(`orders.methods.${row.item.pay_method}`) }}
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
    <ShopOrdersDetail />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  layout: 'shop',
  computed: {
    ...mapState({
      items: (state) => state.api.shop.orders.list.data?.result || [],
      fields: (state) => state.shop.orders.fields,
      paging: (state) => state.api.shop.orders.list.data?.paging || {},
      loading: (state) => state.api.shop.orders.list.onFetch,
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
      this.initDetailModal();
    }
  },
  methods: {
    ...mapActions({
      request: 'api/shop/orders/list/request',
      setModal: 'shop/orders/setModal',
    }),
    updatePage(page) {
      this.request({ page });
    },
    initDetailModal() {
      const detailId = this.$route.query['show-detail-id'];
      if (detailId) {
        this.setModal({ visible: true, data: {} });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.detail {
  div {
    display: flex;
    padding: 4px;
    height: 30px;
    font-size: 16px;
    justify-content: flex-start;
    align-items: center;
    span {
      font-weight: bold;
    }
  }
}

::v-deep .hide-ok {
  footer {
    button.btn:last-child {
      display: none;
    }
  }
}
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
