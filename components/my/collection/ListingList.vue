<template>
  <div class="pt-4">
    <v-row class="ma-0">
      <v-col cols="12" v-if="!items.length">
        <NoData />
      </v-col>
      <v-col cols="6" v-for="item in items" :key="item.id">
        <Product :item="item" :key="item.id" />
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

    <CancelModal />
  </div>
</template>

<script>
import Product from '@/components/my/collection/ProductListed.vue';
import CancelModal from '@/components/my/collection/modals/Cancel.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { Product, CancelModal },
  created() {
    this.getItems();
  },  
  computed: {
    ...mapState({
      items: (state) => state.api.my.listing.data?.result || [],
      loading: (state) => state.api.my.listing.onFetch,
      paging: (state) => state.api.my.listing.data?.result?.paging || {},
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'api/my/listing/request',
    }),
    updatePage(page) {
      this.getItems({ page });
    },
  },  
};
</script>
