<template>
  <v-footer :absolute="!layout.fixed" app>
    <span>&copy; {{ new Date().getFullYear() }}</span>
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
