<template>
  <div>
    <v-row class="py-3">
      <v-col cols="6" v-for="item in items" :key="item.id">
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
};
</script>
