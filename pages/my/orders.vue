<template>
  <section>
    <Banner />
    <div class="my-box">
      <v-tabs v-model="tab" class="my-tab">
        <v-tab>
          {{ $t('my.order.titles.buy_list') }}
        </v-tab>
        <v-tab>
          {{ $t('my.order.titles.sale_list') }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="my-tab-items" touchless>
        <v-tab-item>
          <v-tabs v-model="subtab" class="mytab my-sub-tab">
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
          <v-tabs-items v-model="subtab" class="my-sub-tab-items" touchless>
            <v-tab-item><MyOrdersFixedPrice :visible="tab === 0 && subtab === 0" /></v-tab-item>
            <v-tab-item><MyOrdersBidding /></v-tab-item>
            <v-tab-item><MyOrdersBidded :visible="tab === 0 && subtab === 2" /></v-tab-item>
          </v-tabs-items>
        </v-tab-item>
        <v-tab-item>
          <MyOrdersSale :visible="tab === 1" />
        </v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import Banner from '@/layouts/my/Banner';

export default {
  components: {
    Banner,    
  },
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

<style scoped>
@import '@/assets/css/pages/my.scss';
</style>
    
