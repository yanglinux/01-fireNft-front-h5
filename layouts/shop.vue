<template>
  <v-app>
    <Navigation v-if="isLogin" />
    <Appbar v-if="isLogin" />
    <AppbarBlank v-else />
    <v-main class="main">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import Appbar from '@/layouts/shop/appbar.vue';
import AppbarBlank from '@/layouts/shop/appbar-blank.vue';
import Navigation from '@/layouts/shop/navigation.vue';
import Footer from '@/layouts/default/footer.vue';
import toastedMixin from '@/plugins/vue-toasted';
import { mapGetters } from 'vuex';

export default {
  mixins: [toastedMixin],
  components: {
    Appbar,
    AppbarBlank,
    Navigation,
    Footer,
  },
  computed: {
    ...mapGetters({
      isLogin: 'shop/user/isLogin',
    }),
  },
};
</script>

<style scoped>
.main{
  background: #F2F2F2;
}
.main /deep/ .v-main__wrap{
  padding-bottom: 10px
}
.main .container{
  height: 100%;
  padding: 20px;
  border-radius: 16px;  
  background: #FFFFFF;
}
</style>

<style>
@import '@/assets/css/pages/shop.scss';
</style>
