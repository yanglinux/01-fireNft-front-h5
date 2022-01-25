<template>
    <div class="my-box">
      <div class="text-h6 mb-2">{{ $t('my.credit_card.title') }}</div>
      <v-tabs v-model="tabs" class="my-tab">
        <v-tab>Marketplace</v-tab>
        <v-tab>Shop</v-tab>
      </v-tabs>
      <div v-if="tabs === 0">
        <v-progress-linear indeterminate v-if="loadingMarketplace"></v-progress-linear>
        <div v-else>
          <Register v-if="!cardMarketplace.persisted" type="marketplace" />
          <MyCreditCardDetail v-else :mycard="cardMarketplace" type="marketplace" />
        </div>
      </div>
      <div v-else-if="tabs === 1">
        <v-progress-linear indeterminate v-if="loadingShop"></v-progress-linear>
        <div v-else>
          <Register v-if="!cardShop.persisted" name="shop" type="payout" />
          <MyCreditCardDetail v-else :mycard="cardShop" type="payout" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions, mapState } from 'vuex';
  import Register from '@/components/my/credit_card/Register.vue';
  
  export default {
    components: { Register },
    data() {
      return {
        modal: false,
        tabs: null,
      };
    },
    watch: {
      tabs(next) {
        if (next === 0) {
          this.getMyCreditCardMarketplace();
        } else if (next === 1) {
          this.getMyCreditCardShop();
        }
      },
    },
    computed: {
      ...mapState({
        loadingShop: (state) => state.api.my.credit_card.shop_info.onFetch,
        cardShop: (state) => state.api.my.credit_card.shop_info.data,
        loadingMarketplace: (state) => state.api.my.credit_card.marketplace_info.onFetch,
        cardMarketplace: (state) => state.api.my.credit_card.marketplace_info.data,
      }),
    },
    methods: {
      ...mapActions({
        getMyCreditCardShop: 'api/my/credit_card/shop_info/request',
        getMyCreditCardMarketplace: 'api/my/credit_card/marketplace_info/request',
      }),
    },
  };
  </script>
  
  <style scoped>
@import '@/assets/css/pages/my.scss';
  .card-field {
    height: 30px;
    border-bottom: 1px solid gray;
  }
  </style>
  