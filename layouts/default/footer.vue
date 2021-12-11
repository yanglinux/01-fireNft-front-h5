<template>
  <v-footer dark :absolute="!layout.fixed" class="d-flex justify-center pa-5 mt-5" app>
    <img src="@/assets/img/logo1.png" style="width: 63px" />
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
