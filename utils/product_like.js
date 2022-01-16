import { mapState, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      like: 0,
      favorite: false,
    };
  },
  watch: {
    addLikeLoading(next, prev) {
      if (prev === true && next === false && this.favorite) {
        if (!this.addLikeError) {
          this.like += 1;
        }
        this.favorite = false;
      }
    },
    deleteLikeLoading(next, prev) {
      if (prev === true && next === false && this.favorite) {
        if (!this.deleteLikeError) {
          this.like -= 1;
        }
        this.favorite = false;
      }
    },
  },
  computed: {
    ...mapState({
      addLikeLoading: (state) => state.api.user.favorite.onFetch,
      addLikeError: (state) => state.api.user.favorite.error,
      deleteLikeLoading: (state) => state.api.user.favorite_delete.onFetch,
      deleteLikeError: (state) => state.api.user.favorite_delete.error,
    }),
    favorited() {
      return !!(this.item.favorited ^ !!this.like);
    },
    favoritedCount() {
      return this.item.favorites_count + this.like;
    },
  },
  methods: {
    ...mapActions({
      requestFavorite: 'api/user/favorite/request',
      requestFavoriteDelete: 'api/user/favorite_delete/request',
    }),
    onFavorite() {
      this.favorite = true;
      if (this.favorited) this.requestFavoriteDelete({ id: this.item.id });
      else this.requestFavorite({ id: this.item.id });
    },
  },
};
