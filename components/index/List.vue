<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" v-for="item in items" :key="item.id">
        <Product :item="item" :key="item.id" />
      </v-col>
    </v-row>
    <v-row v-if="items.length >= 3">
      <v-col>
        <v-btn @click="toProductPage()" dark color="black" block>{{ $t('buttons.load_more') }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/index/Product.vue';

export default {
  components: { Product },
  props: {
    items: {
      type: Array,
      default: [],
    },
    index: {
      type: Number,
    },
  },
  methods: {
    toProductPage() {
      this.$router.push(`/products?tab=${this.index}&order=${this.$parent.$parent.$parent.sort.value}`);
    },
  },
};
</script>
