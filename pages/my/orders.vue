<template>
  <div>
    <v-card>
      <v-card-text class="pa-0">
        <v-tabs v-model="tab">
          <v-tab>
            {{ $t('my.order.titles.buy_list') }}
          </v-tab>
          <v-tab>
            {{ $t('my.order.titles.sale_list') }}
          </v-tab>
        </v-tabs>
      </v-card-text>
    </v-card>

    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-tabs v-model="subtab" class="mytab mt-2">
          <v-tab>
            {{ $t('my.order.titles.fixed_price') }}
          </v-tab>
          <v-tab>
            {{ $t('my.order.titles.bidding') }}
          </v-tab>
          <v-tab>
            {{ $t('my.order.titles.bidded') }}
          </v-tab>
        </v-tabs>

        <v-tabs-items v-model="subtab">
          <v-tab-item><MyOrdersFixedPrice /></v-tab-item>
          <v-tab-item><MyOrdersBidding /></v-tab-item>
          <v-tab-item><MyOrdersBidded /></v-tab-item>
        </v-tabs-items>
      </v-tab-item>
      <v-tab-item>
        <MyOrdersSale />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      tab: null,
      subtab: null,
    };
  },
  watch: {},
  computed: {
    ...mapState({}),
  },
};
</script>
