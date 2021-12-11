<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <div class="text--h6">{{ $t('product.detail.titles.other_products') }}</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6" v-for="item in items" :key="item.id">
        <Product :item="item" :key="item.id" />
      </v-col>
    </v-row>
  </v-container>
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
  },
};
</script>
