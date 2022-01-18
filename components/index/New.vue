<template>
  <section>
    <div class="text-h6 d-flex">
      {{ $t('index.titles.latest_products') }}
      <v-btn color="primary" small class="ml-auto" rounded @click="$router.push('/products?tab=0&order=sale_start_desc')">
        See all
      </v-btn>
    </div>
    <v-carousel
    :show-arrows="false" 
    hide-delimiter-background 
    height="300" 
    v-model="index" 
    :interval="3000"
    >
      <v-carousel-item
        @click="() => $router.push(`/products/${item.id}`)"
        v-for="(item, i) in items.slice(0, 5)"
        :key="i"
        :src="item.cover_image_url"
        class="img-item"
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
