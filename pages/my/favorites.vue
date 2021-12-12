<template>
  <div class="pa-3">
    <div class="text-h6 mb-4">{{ $t('my.favorites.title') }}</div>
    <v-row>      
      <v-col cols="12" v-if="!items.length">
        <NoData />
      </v-col>
      <v-col cols="6" v-for="item in items" :key="item.product.id">
        <div class="d-flex flex-no-wrap justify-space-between"  @click="() => redictDetail(item.product.id)">
          <v-img
            :src="item.product.cover_image_url"
            class="white--text align-end product-img"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            height="200px"
          >
            <v-card-title class="pb-1 text-body-2" v-text="item.product.title"></v-card-title>
          </v-img>
        </div>
      </v-col>
      <v-col cols="12" v-if="items.length">
        <v-pagination
          circle
          :disabled="loading"
          @input="updatePage"
          :value="paging.current_page || 1"
          :length="Math.ceil(paging.total_count / paging.per_page) || 1"
        ></v-pagination>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      items: (state) => state.api.my.favorites.data.result || [],
      loading: (state) => state.api.my.favorites.onFetch,
      paging: (state) => state.api.my.favorites.data.paging || {},
    }),
  },
  created() {
    this.getItems();
  },
  methods: {
    ...mapActions({
      getItems: 'api/my/favorites/request',
    }),
    redictDetail(id) {
      this.$router.push('/products/' + id);
    },
    updatePage(page) {
      this.getItems({ page });
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/my.scss';
</style>
