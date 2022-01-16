<template>
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <NoData v-if="!items.length" />
        </v-col>
        <v-col cols="6" v-for="item in items" :key="item.id">
          <MyCollectionProductSold :item="item" :key="item.id" @onClickDetail="onClickDetail" />
        </v-col>
        <v-col cols="12">
          <v-pagination
            circle
            :disabled="loading"
            @input="updatePage"
            :value="paging.current_page || 1"
            :length="paging.total_pages"
          ></v-pagination>
        </v-col>
      </v-row>
      <MyCollectionModalsDetailSold @hide="hideDetailModal" :item="modalDetail" />
    </v-container>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data: () => ({
      modalDetail: null,
    }),
    created() {
      this.getItems();
    },
    computed: {
      ...mapState({
        items: (state) => state.api.my.sold.data?.result || [],
        loading: (state) => state.api.my.sold.onFetch,
        paging: (state) => state.api.my.sold.data?.paging || {},
      }),
    },
    methods: {
      ...mapActions({
        getItems: 'api/my/sold/request',
      }),
      updatePage(page) {
        this.getItems({ page });
      },
      onClickDetail(item) {
        this.modalDetail = item;
      },
      hideDetailModal() {
        this.modalDetail = null;
      },
    },
  };
  </script>
  