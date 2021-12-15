<template>
  <v-app-bar fixed app class="appbar-blank">
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

<style scoped>
.appbar-blank /deep/ .v-toolbar__content{
  width: 100%;
  justify-content: space-between !important;
  padding-right: 0;
  padding-left: 10px;
}
</style>
