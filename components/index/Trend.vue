<template>
  <div>
    <div class="text-h6">{{ $t('index.titles.hot_products') }}</div>
    <v-carousel :show-arrows="false" 
    hide-delimiter-background 
    height="300" 
    :interval="3000">
      <v-carousel-item
        @click="() => $router.push(`/products/${item.id}`)"
        v-for="(item, i) in items.slice(0, 5)"
        :key="i"
        :src="item.cover_image_url" 
        class="img-item"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    items: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style scoped>
  .img-item{
    border-radius: 16px;
    overflow: hidden;
  }
</style>
