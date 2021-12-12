<template>
  <div>
    <v-row class="py-3">
      <v-col cols="6" v-for="item in items1" :key="item.id">
        <Product :item="item" :key="item.id" />
      </v-col>
    </v-row>
    <v-row class="pt-2">
      <v-col v-if="showLoadMore">
        <v-btn :loading="loading" @click="loadMore" block class="btn-green-radius-large">
          {{ loadMoreText || $t('buttons.load_more') }}
        </v-btn>
      </v-col>
      <v-col v-else class="d-flex justify-center align-center">
        <span style="color: #cfd8dc">{{ $t('message.info_no_data') }}</span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Product from '@/components/index/Product';

export default {
  components: { Product },
  props: {
    items: {
      type: Array,
      default: () => [],
    },
    showLoadMore: {
      type: Boolean,
      default: false,
    },
    onLoadMore: {
      type: Function,
      default: () => {},
    },
    loadMoreText: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    loadMore() {
      this.$emit('onLoadMore');
    },
  },
  data(){
    return{
      items1:[{
        product: {id: 98, title: "spaceman001",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/cover_%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
favorites_count: 2,
id: 98,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
title: "spaceman001",
},
      brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x29fa14d956c9737c8c1f0cdc29f1b1c9e2293af0",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/cover_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
created_at: "2021-12-05T16:24:07+09:00",
description: "抽象油画4新",
exhibit: {id: 163, status: "bidded", price_type: "fixed_price", fixed_price: 10000, start_price: null},
favorited: false,
favorites_count: 1,
id: 109,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/main_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
owner: {id: 10, owner_type: "User", name: "76884a06", image_url: null},
status: "listing",
status_change_reason: null,
title: "抽象油画4",
total: 1,
view_count: 13,
      },{
        product: {id: 98, title: "spaceman001",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/cover_%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
favorites_count: 2,
id: 98,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
title: "spaceman001",
},
      brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x29fa14d956c9737c8c1f0cdc29f1b1c9e2293af0",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/cover_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
created_at: "2021-12-05T16:24:07+09:00",
description: "抽象油画4新",
exhibit: {id: 163, status: "bidded", price_type: "fixed_price", fixed_price: 10000, start_price: null},
favorited: false,
favorites_count: 1,
id: 109,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/main_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
owner: {id: 10, owner_type: "User", name: "76884a06", image_url: null},
status: "listing",
status_change_reason: null,
title: "抽象油画4",
total: 1,
view_count: 13,
      }]
    }
  },
};
</script>
