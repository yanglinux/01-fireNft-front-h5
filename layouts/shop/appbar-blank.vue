<template>
  <v-app-bar fixed app>
    <v-toolbar-title v-text="layout.title" />
    <v-spacer />
    <Language />
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
    }),
  },
};
</script>
