<template>
  <v-carousel height="168">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: require('@/assets/img/banner1.png'),
        },
        {
          src: require('@/assets/img/banner2.png'),
        },
        {
          src: require('@/assets/img/banner3.png'),
        },
        {
          src: require('@/assets/img/banner4.png'),
        },
        {
          src: require('@/assets/img/banner5.png'),
        },
      ],
    };
  },
};
</script>
