<template>
  <v-carousel height="268" class="banner">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      reverse-transition="fade-transition"
      transition="fade-transition"
    >
    <p class="t1">FireDigital NFT<br>MarketPlace<span style="color: rgb(255, 69, 0);"><b>(testnet)</b></span></p>
    <p class="t2">PlatForm Version</p>
  </v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: require('@/assets/img/banner1.jpg'),
        },
        {
          src: require('@/assets/img/banner1.jpg'),
        },
        {
          src: require('@/assets/img/banner1.jpg'),
        },
        {
          src: require('@/assets/img/banner1.jpg'),
        },
        {
          src: require('@/assets/img/banner1.jpg'),
        },
      ],
    };
  },
};
</script>

<style scoped>
.banner /deep/ .v-carousel__controls{
  display: none !important;
}
.banner /deep/ .v-window__prev,
.banner /deep/.v-window__next{
  top: calc(50% + 25px);
}
.banner /deep/ .v-image__image{
  background-size: 100% 100%;
}
.banner .t1{
  width: 100%;
  padding: 134px 45px 0;
  color: #0E7868;
  margin: 0;
  font-size: 20px;
  line-height: 1.2;
}
.banner .t2{
  width: 100%;
  padding: 10px 45px 0;
  color: #0E7868;
  margin: 0;
  font-size: 12px;
}
.banner /deep/ .v-window__prev,
.banner /deep/ .v-window__next{
  background: transparent;
  margin: 0;
}
.banner /deep/ .v-btn > .v-btn__content .v-icon{
  color: #0E7868;
}
</style>
