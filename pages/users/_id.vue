<template>
  <div>
    <v-card color="green" dark>
      <div class="d-flex flex-no-wrap justify-space-between pa-2">
        <v-avatar class="ma-3" size="60" tile>
          <v-img :src="profile.image || defaultImage"></v-img>
        </v-avatar>
        <div>
          <v-card-title class="text-h6">{{ profile.nick_name }}</v-card-title>
          <v-card-subtitle v-html="autoLink(profile.introduction || '')"></v-card-subtitle>
        </div>
      </div>
    </v-card>
    <div class="pa-3">
    <div class="mb-4 text-h6">{{ $t('titles.shop_listing_product') }}</div>
      <v-row>
        <v-col cols="6" v-for="item in items" :key="item.id">
          <IndexProduct :item="item" :key="item.id" />
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
    </div>
  </div>
</template>

<script>
import defaultImage from "@/assets/img/head.jpg";
import autoLink from 'autolink.js';

import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    defaultImage,
  }),
  created() {
    this.request({ id: this.$route.params.id });
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.users.onFetch,
      profile: (state) => state.api.users.data?.profile || {},
      paging: (state) => state.api.users.data?.listing_products?.paging || {},
      items: (state) => state.api.users.data?.listing_products?.result || [],
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/users/request',
    }),
    updatePage(page) {
      this.request({
        id: this.$route.params.id,
        page,
      });
    },
    autoLink,
  },
};
</script>
