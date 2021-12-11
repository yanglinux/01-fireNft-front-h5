<template>
  <section>
    <div class="text-h6">{{ $t('index.titles.latest_products') }}</div>
    <v-carousel
      :continuous="false"
      :cycle="cycle"
      :show-arrows="false"
      hide-delimiter-background
      delimiter-icon="mdi-minus"
      height="300"
      v-model="index"
    >
      <v-carousel-item
        @click="() => $router.push(`/products/${item.id}`)"
        v-for="(item, i) in items"
        :key="i"
        :src="item.cover_image_url"
        class="img-item"
      ></v-carousel-item>
    </v-carousel>
    <v-list two-line v-if="current">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            {{ current.title }}
            <br />
            JPY ¥ {{ getPrice() }}
          </v-list-item-title>
          <v-list-item-subtitle>
            ≈ CNY ¥{{ getPrice('cny') }}
            <br />
            ≈ USD ${{ getPrice('usd') }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
  .v-sheet.v-list{
    box-shadow: 0 0 0 rgba(0,0,0,0)
  }
</style>
