<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <NoData v-if="!items.length" />
      </v-col>
      <v-col cols="6" v-for="item in items" :key="item.id">
        <Product :item="item" :key="item.id" />
      </v-col>
      <v-col cols="12">
        <v-pagination
          circle
          :disabled="loading"
          @input="updatePage"
          :value="paging.current_page || 1"
          :length="Math.ceil(paging.total_count / paging.per_page) || 1"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from '@/components/my/collection/ProductSold.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { Product },
  created() {
    this.getItems();
  },  
  computed: {
    ...mapState({
      items: (state) => state.api.my.sold.data?.result || [],
      loading: (state) => state.api.my.sold.onFetch,
      paging: (state) => state.api.my.sold.data?.result?.paging || {},
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'api/my/sold/request',
    }),
    updatePage(page) {
      this.getItems({ page });
    },
  },
};
</script>
