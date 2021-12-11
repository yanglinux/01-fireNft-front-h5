import Vue from 'vue';
import Toasted from 'vue-toasted';
import { mapState } from 'vuex';

Vue.use(Toasted);

export default {
  computed: {
    ...mapState({
      toast: (state) => state.toast.data,
    }),
  },
  watch: {
    toast(next) {
      const { text, ...options } = next;
      this.$toasted.show(text, options);
    },
  },
};
