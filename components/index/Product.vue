<template>
  <v-card class="item mx-auto" max-width="374" @click="toDetailPage">
    <v-img :src="item.cover_image_url"></v-img>

    <v-card-title class="text-body-2">{{ item.title }}</v-card-title>

    <v-card-text>
      <v-row class="mx-0">
        <div class="grey--text">{{ item.category.name }}</div>
      </v-row>
      <div class="my-4 mb-1">JPY ¥{{ getPrice() }}</div>
      <div class="grey--text">≈ CNY ¥{{ getPrice('cny') }}</div>
      <div class="grey--text">≈ USD ${{ getPrice('usd') }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getPrice(currency) {
      let price = '';
      const { exhibit } = this.item;
      if (!exhibit) price = '';
      else {
        const { price_type } = exhibit;
        const prop = price_type === 'auction' ? 'current_price' : 'fixed_price';
        price = exhibit[[prop, currency].filter((x) => x).join('_')];
      }
      return price;
    },
    toDetailPage() {
      this.$router.push(`/products/${this.item.id}`);
    },
  },
};
</script>
