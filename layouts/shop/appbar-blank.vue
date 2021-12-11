<template>
  <v-app-bar fixed app>
    <v-toolbar-title @click="() => $router.push('/')">
        <img src="@/assets/img/logo.svg" style="width: 115px" />
    </v-toolbar-title>    
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
