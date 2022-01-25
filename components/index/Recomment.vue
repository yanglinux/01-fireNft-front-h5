<template>
  <section>
    <div class="text-h6 d-flex">
      {{ $t('index.titles.recommend_products') }}
      <v-btn color="primary" small class="ml-auto" rounded @click="$router.push('/products?tab=0&order=price_desc')">
        See all
      </v-btn>
    </div>
    <v-carousel 
      :show-arrows="false" 
      hide-delimiter-background 
      height="300" 
      v-model="index" 
      :interval="3000">
      <v-carousel-item
        @click="() => $router.push(`/products/${item.id}`)"
        v-for="(item, i) in items.slice(0, 5)"
        :key="i"
        :src="item.cover_image_url"
      ></v-carousel-item>
    </v-carousel>
    <div class="news-info pa-3" v-if="current">
      <p class="text-ellipsis" :title="current.title">{{ current.title }}</p>        
      <p>JPY <span>¥{{ getPrice() }}</span></p>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      index: 0,
      cycle: false,
    };
  },
  computed: {
    current() {
      return this.items[this.index];
    },
    startPrice() {
      const { start_price = 0 } = this.current?.exhibit || {};
      return start_price.toLocaleString();
    },
    currentPrice() {
      const { fixed_price = 0, current_price = 0, price_type } = this.current?.exhibit || {};
      const price = price_type === 'auction' ? current_price : fixed_price;
      return price.toLocaleString();
    },
    priceType() {
      const { price_type = '' } = this.current?.exhibit || {};
      return price_type;
    },
  },
  methods: {
    getPrice(currency) {
      let price = '';
      const { exhibit } = this.current;
      if (!exhibit) price = '';
      else {
        const { price_type } = exhibit;
        const prop = price_type === 'auction' ? 'current_price' : 'fixed_price';
        price = exhibit[[prop, currency].filter((x) => x).join('_')];
      }
      return price;
    },
  },
};
</script>
<style scoped>
  .img-item{
    border-radius: 16px 16px 0 0;  
    overflow: hidden;
  }
  .news-info{
    background: #fff;
    border-radius: 0 0 16px 16px; 
  }
  .news-info p{
    margin-bottom: 0;
    font-size: 14px;
  }
  .news-info p span{
    font-size: 16px;
    font-weight: bold;
  }
</style>