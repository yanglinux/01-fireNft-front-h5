<template>
  <v-app>
    <Navigation />
    <Appbar />
    <v-main class="main">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>    
    <Footer />
  </v-app>
</template>

<script>
import Appbar from '@/layouts/default/appbar.vue';
import Navigation from '@/layouts/default/navigation.vue';
import Footer from '@/layouts/default/footer.vue';
import toastedMixin from '@/plugins/vue-toasted';

export default {
  mixins: [toastedMixin],
  components: {
    Appbar,
    Navigation,
    Footer,
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
    padding: 0;
  }
</style>
