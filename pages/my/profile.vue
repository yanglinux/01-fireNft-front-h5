<template>
  <section>
    <Banner />
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <MyProfileTop />
        </v-col>
        <v-col cols="12">
          <MyProfileForm />
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import Banner from '@/layouts/my/Banner';
export default {
  components: {
    Banner,    
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/my.scss';
</style>