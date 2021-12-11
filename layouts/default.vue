<template>
  <v-app>
    <Navigation />
    <Appbar />
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <Right />
    <Footer />
  </v-app>
</template>

<script>
import Appbar from '@/layouts/default/appbar.vue';
import Navigation from '@/layouts/default/navigation.vue';
import Right from '@/layouts/default/drawer.vue';
import Footer from '@/layouts/default/footer.vue';
import toastedMixin from '@/plugins/vue-toasted';

export default {
  mixins: [toastedMixin],
  components: {
    Appbar,
    Navigation,
    Right,
    Footer,
  },
};
</script>
