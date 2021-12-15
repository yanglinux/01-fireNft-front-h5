<template>
  <v-footer :absolute="!layout.fixed" class="d-flex justify-center footer" app>
    <img src="@/assets/img/logo1.svg" style="width: 97px" />
  </v-footer>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
    }),
  },
  methods: {
    ...mapActions({
      setLayout: 'app/setLayout',
    }),
  },
};
</script>

<style scoped>
.footer{
  height: 72px;
  background: linear-gradient(214deg, #0E7868 0%, #369465 100%);
}
</style>
