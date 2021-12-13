<template>
  <div @click.stop="favorite">
    <v-icon>{{ icon }}</v-icon> {{ total }}
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  props: {
    id: {
      type: [String, Number],
    },
    value: {
      type: Boolean,
      default: false,
    },
    count: {
      type: [String, Number ],
      default: 0
    },
    change: {
      type: Function,
      default: () => {},
    },
  },
  data: () => ({
    num: null
  }),
  watch: {
    loading(next, prev) {
      if (prev === true && next === false && !this.error) {
        this.$emit('change', true);
        const baseCount = this.num !== null ? this.num : this.count; 
        this.num = baseCount + 1;
      }
    },
    deleteLoading(next, prev) {
      if (prev === true && next === false && !this.deleteError) {
        this.$emit('change', false);
        const baseCount = this.num !== null ? this.num : this.count; 
        this.num = baseCount - 1;
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.user.favorite.onFetch,
      error: (state) => state.api.user.favorite.error,
      deleteLoading: (state) => state.api.user.favorite_delete.onFetch,
      deleteError: (state) => state.api.user.favorite_delete.error,
    }),
    icon() {
      return this.value ? 'mdi-heart' : 'mdi-heart-outline';
    },
    total() {
      return this.num !== null ? this.num : this.count;
    }
  },
  methods: {
    ...mapActions({
      request: 'api/user/favorite/request',
      deleteRequest: 'api/user/favorite_delete/request',
    }),
    favorite() {
      if (!this.loading) {
        if (this.value) {
          this.deleteRequest({ id: this.id });
        } else {
          this.request({ id: this.id });
        }
      }
    },
  },
};
</script>
