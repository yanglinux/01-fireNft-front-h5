<template>
  <section>
    <v-row>
      <v-col cols="6" v-for="item in items" :key="item.id">
        <Product :item="item" :key="item.id" />
      </v-col>
    </v-row>
    <div v-if="items.length >= 3" class="mt-4">
      <v-btn @click="toProductPage()" block class="btn-white-radius">{{ $t('buttons.load_more') }}</v-btn>
    </div>
  </section>
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

<style scoped>
.btn-white-radius{
  height: 48px !important;
  border-radius: 24px !important;
  border: 2px solid #0E7868;
  background: transparent;
  box-shadow: 0 0 0 rgba(0,0,0,0);
  color: #0E7868;
  font-size: 16px;
}
</style>
