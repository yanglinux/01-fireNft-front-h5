<template>
  <div>
    <div class="mytab mb-2">
      <v-card>
        <v-tabs v-model="currentItem" class="mytab">
          <v-tabs-slider></v-tabs-slider>
          <v-tab class="pa-1">
            {{ $t('titles.all') }}
          </v-tab>
          <v-tab>
            {{ $t('product.type.fixed_price') }}
          </v-tab>
          <v-tab>
            {{ $t('product.type.auction') }}
          </v-tab>
          <div class="d-flex justify-center align-center pr-1">
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn text class="align-self-right pr-0" v-bind="attrs" v-on="on">
                  {{ sort.title }}
                  <v-icon right class="ml-0">mdi-menu-down</v-icon>
                </v-btn>
              </template>

              <v-list class="grey lighten-3">
                <v-list-item @click="updateSort(item)" v-for="item in sorts" :key="item.value">
                  {{ item.title }}
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
        </v-tabs>
      </v-card>
    </div>
    <v-tabs-items v-model="currentItem">
      <v-tab-item :value="0">
        <ProductList
          :loading="allLoading"
          :items="items.all"
          @onLoadMore="onLoadMore"
          :showLoadMore="showLoadMore('all')"
        />
      </v-tab-item>
      <v-tab-item :value="1">
        <ProductList
          :loading="fixedPriceLoading"
          :items="items.fixedPrice"
          @onLoadMore="onLoadMore"
          :showLoadMore="showLoadMore('fixedPrice')"
        />
      </v-tab-item>
      <v-tab-item :value="2">
        <ProductList
          :loading="auctionLoading"
          :items="items.auction"
          @onLoadMore="onLoadMore"
          :showLoadMore="showLoadMore('auction')"
        />
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { sorts } from '@/utils/common';
import ProductList from '@/components/products/List';

export default {
  components: { ProductList },
  data: function () {
    const data = {
      currentItem: null,
      sorts: sorts.bind(this)(),
      items: {
        all: [],
        fixedPrice: [],
        auction: [],
      },
      tabInit: {},
      per: 6,
    };
    data.sort = data.sorts[0];
    return data;
  },
  watch: {
    allLoading(next, prev) {
      if (next === false && prev === true && !this.allError) {
        this.items.all = [...this.items.all, ...this.allItems];
      }
    },
    fixedPriceLoading(next, prev) {
      if (next === false && prev === true && !this.fixedPriceError) {
        this.items.fixedPrice = [...this.items.fixedPrice, ...this.fixedPriceItems];
      }
    },
    auctionLoading(next, prev) {
      if (next === false && prev === true && !this.auctionError) {
        this.items.auction = [...this.items.auction, ...this.auctionItems];
      }
    },
    currentItem(tab) {
      console.log(`tab index change`, tab, typeof tab);
      this.request();
    },
  },
  created() {
    const { tab = 0 } = this.$route.query;
    this.currentItem = Number.parseInt(tab);
  },
  computed: {
    ...mapState({
      allLoading: (state) => state.api.user.products.onFetch,
      allError: (state) => state.api.user.products.error,
      allItems: (state) => state.api.user.products.data?.result || [],
      allPaging: (state) => state.api.user.products.data?.paging || {},
      auctionLoading: (state) => state.api.user.products_auction.onFetch,
      auctionError: (state) => state.api.user.products_auction.error,
      auctionItems: (state) => state.api.user.products_auction.data?.result || [],
      auctionPaging: (state) => state.api.user.products_auction.data?.paging || {},
      fixedPriceLoading: (state) => state.api.user.products_fixed_price.onFetch,
      fixedPriceError: (state) => state.api.user.products_fixed_price.error,
      fixedPriceItems: (state) => state.api.user.products_fixed_price.data?.result || [],
      fixedPricePaging: (state) => state.api.user.products_fixed_price.data?.paging || {},
    }),
    showLoadMore() {
      return (name) => {
        const { current_page, total_pages, total_count } = this[`${name}Paging`];
        let show = false;
        if (total_count === 0) show = false;
        else if (!current_page || !total_pages) show = true;
        else show = current_page < total_pages;
        return show;
      };
    },
  },
  methods: {
    ...mapActions({
      getFixedPriceProducts: 'api/user/products_fixed_price/request',
      getAuctionProducts: 'api/user/products_auction/request',
      getProducts: 'api/user/products/request',
    }),
    request(data = {}) {
      const requestList = [this.getProducts, this.getFixedPriceProducts, this.getAuctionProducts];
      const { order, s } = this.$route.query;
      const request = requestList[this.currentItem];
      if (!data.page && this.tabInit[this.currentItem]) return;
      const page = data.page || 1;

      const params = {
        page,
        'q[title_cont]': s,
        sort_by: order,
        per: this.per,
      };
      request({
        ...params,
        ...data,
      });
      this.tabInit[this.currentItem] = true;
    },
    onLoadMore() {
      const pagingList = [this.allPaging, this.fixedPricePaging, this.auctionPaging];
      const { current_page = 1 } = pagingList[this.currentItem];
      this.request({ page: current_page + 1 });
    },
    updateSort(item) {
      const listKey = ['all', 'fixed_price', 'auction'];
      this.items[listKey[this.currentItem]] = [];
      this.sort = item;
      this.request({
        page: 1,
        sort_by: item.value,
      });
    },
  },
};
</script>

<style scoped>
::v-deep .v-tab {
  min-width: unset !important;
}
</style>
