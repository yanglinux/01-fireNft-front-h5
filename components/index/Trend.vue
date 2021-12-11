<template>
  <div>
    <div class="text-h6">{{ $t('index.titles.hot_products') }}</div>
    <v-carousel height="307">
      <v-carousel-item
        @click="() => $router.push(`/products/${item.id}`)"
        v-for="(item, i) in items"
        :key="i"
        :src="item.cover_image_url"
        reverse-transition="fade-transition"
        transition="fade-transition"
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
