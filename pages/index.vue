<template>
  <div class="pa-3">
    <v-row justify="center" align="center" class="index-main">
      <v-col class="ml-0 mr-0 ma-0 search" cols="12">
        <v-text-field solo dense flat hide-details rounded v-model="form.search" class="search-inp">
          <template #append>
            <img src="@/assets/img/svg/ss.svg" class="search-icon" @click="search" />
          </template>
        </v-text-field>
      </v-col>
      <v-col class="pa-0 ma-0" cols="12">
        <Banner />
      </v-col>
      <v-col class="ma-0" cols="12">
        <Trend :items="data1.hot_products || []" />
      </v-col>     
      <v-col class="ma-0" cols="12">
        <New :items="data1.latest_products || []" />
      </v-col>
      <v-col class="ma-0" cols="12">
        <Tab ref="tab" :tab1="data1.fixed_price_products" :tab2="data.auction_products" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Banner from '@/components/index/Banner.vue';
import Trend from '@/components/index/Trend.vue';
import Ad from '@/components/index/Ad.vue';
import New from '@/components/index/New.vue';
import Tab from '@/components/index/Tab.vue';

import { mapState, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      form: {
        search: '',
      },
      data1:{
        auction_products: [{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        },{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13",
total: 1,
view_count: 17,
        }],
fixed_price_products:[{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        },{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        },{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        }],
hot_products:[{brand: "sushi001",
category: {id: 1, name: "画像"},
contract_address: "0x14a9076b3debc8d3ad62458291a4c9864eaec33f",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c1c05bd61c5d5108ce004f91a84c90024b0d28f6645e461ef19a5d93996f5fee/cover_%E5%8D%83%E5%BA%93%E7%BD%91_%E5%9E%82%E6%B6%8E%E6%AC%B2%E6%BB%B4%E7%9A%84%E6%97%A5%E6%9C%AC%E5%AF%BF%E5%8F%B8_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B72874.jpg",
created_at: "2021-12-12T14:35:55+09:00",
description: "sushi001",
exhibit: {id: 195, status: "listing", price_type: "fixed_price", fixed_price: 2450000, start_price: null,},
favorited: false,
favorites_count: 0,
id: 217,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c1c05bd61c5d5108ce004f91a84c90024b0d28f6645e461ef19a5d93996f5fee/main_%E5%8D%83%E5%BA%93%E7%BD%91_%E5%9E%82%E6%B6%8E%E6%AC%B2%E6%BB%B4%E7%9A%84%E6%97%A5%E6%9C%AC%E5%AF%BF%E5%8F%B8_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B72874.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "sushi001",
total: 1,
view_count: 46}],
latest_products: [{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        },{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        },{
          brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x3a344a5b3032956d4564bbd34d9c982d9207c9a5",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/cover_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
created_at: "2021-12-06T22:43:20+09:00",
description: "抽象油画",
exhibit: {id: 115, status: "listing", price_type: "auction", fixed_price: null, start_price: 1000},
favorited: false,
favorites_count: 1,
id: 118,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/bf087d10781d7cffe9cbd98b8df8c085df8d6c494d08e1a6cbc87e1ee0fce4d6/main_%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF-%E9%9D%99%E7%89%A9-%E6%B3%BC%E6%B0%B4.jpg",
owner: {id: 1, owner_type: "Shop", name: "ABC美術館１号店", image_url: null, bank_info: {}},
status: "listing",
status_change_reason: null,
title: "抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13抽象油画13",
total: 1,
view_count: 17,
        }],
      }
    };
  },
  components: { Banner, Trend, Ad, New, Tab },
  beforeCreate: function() {
    document.getElementsByTagName('body')[0].setAttribute('id', 'index');
  },
  beforeDestroy() {
    document.getElementsByTagName('body')[0].removeAttribute('id');
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.request({ sort_by: 'hot_desc' });
    }
  },
  mounted() {
    if (this.$nuxt.layoutName) {
      this.$watch(
        () => {
          return this.$refs.tab.sort;
        },
        ({ value }) => {
          this.request({ sort_by: value });
        }
      );
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.api.user.top.data,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/user/top/request',
    }),
    search() {
      this.$router.push(`/products?s=${this.form.search}`);
    },
  },
  
};
</script>

<style scoped>
.index-main{
  position: relative;
  z-index: 0;
}

.search {
  background: transparent;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 2;
}

/deep/ .search-inp.theme--light.v-text-field--solo > .v-input__control > .v-input__slot{
  background-color: rgba(245,245,245,.58)
}

/deep/ .search-inp.theme--light.v-input input, .theme--light.v-input textarea{
  color: #0E7868;
}

.search-icon {
  margin-right: -12px;
}
</style>

<style>
#index .v-main{
  padding-top: 0 !important;
  background: #F2F2F2
}

</style>
