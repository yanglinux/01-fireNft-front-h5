<template>
  <v-navigation-drawer
    @input="(e) => setLayout(['drawer', e])"
    :value="layout.drawer"
    :mini-variant="layout.miniVariant"
    :clipped="layout.clipped"
    fixed
    app
  >
    <v-list>
      <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
        <v-list-item-content>
          <v-list-item-title v-text="$t(`sidebar.shop.${item.title}`)" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    items: [
      {
        title: 'product_manager',
        to: '/shop/product/manager',
      },
      {
        title: 'sales_manager',
        to: '/shop/sales/manager',
      },
      {
        title: 'orders_manager',
        to: '/shop/orders/manager',
      },
      {
        title: 'earnings_manager',
        to: '/shop/earnings/manager',
      },
      {
        title: 'replacement',
        to: '/shop/replacement/manager',
      },
      {
        title: 'setting',
        to: '/shop/setting',
      },
    ],
  }),
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
    }),
  },
  methods: {
    ...mapActions({
      setLayout: 'app/setLayout',
    }),
  },
};
</script>
