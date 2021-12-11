<template>
  <v-app>
    <Navigation v-if="isLogin" />
    <Appbar v-if="isLogin" />
    <AppbarBlank v-else />
    <v-main>
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
import Footer from '@/layouts/shop/footer.vue';
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
