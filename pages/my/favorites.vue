<template>
  <section>
    <Banner />  
    <div class="pa-3">
      <div class="text-h6 mb-4">{{ $t('my.favorites.title') }}</div>
      <v-row>      
        <v-col cols="12" v-if="!items.length">
          <NoData />
        </v-col>
        <v-col cols="6" v-for="item in items" :key="item.product.id" style="position: relative;">
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
  </section>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Banner from '@/layouts/my/Banner';

export default {
  components: {
    Banner,    
  },
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
    async setFavorites() {      
      if (this.currentUser.uid === undefined) {
        this.$router.push('/login');
        return;
      }
      if (this.item.favorited === true) {
        this.$axios
          .delete(`/v1/products/${this.item.product.id}/favorite`)
          .then((response) => {
            this.item.favorited = false;            
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.$axios
          .post(`/v1/products/${this.product.item.id}/favorite`)
          .then((response) => {
            this.item.favorited = true;
          })
          .catch((e) => {
            console.log(e);
          });
      }

    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/my.scss';
.dz {
  position: absolute;
  z-index: 20;
  bottom: 20px;
  right: 26px;
  width: 13px;
  height: 13px;
  background-size: 100%; 
}
</style>
