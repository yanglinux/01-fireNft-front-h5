<template>
  <section>
    <div class="personal-header">
      <div class="personal-header-img">
          <v-avatar size="60" tile>
            <v-img :src="profile.image || defaultImage"></v-img>
          </v-avatar>
      </div>
      <div class="personal-header-info">
        <h2>{{ profile.name }}</h2>
        <div class="info-con" style="white-space: pre-wrap; word-wrap:break-word;">{{ profile.description }}</div>
      </div>
    </div>
    <div class="pa-3">
      <div class="mb-4 text-h6">{{ $t('titles.shop_listing_product') }}</div>
      <v-row>
        <v-col cols="6" v-for="item in items" :key="item.id">
          <IndexProduct :item="item" :key="item.id" />
        </v-col>
        <v-col cols="12" v-if="items.length>paging.per_page">
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
import autoLink from 'autolink.js';
import defaultImage from '@/assets/img/svg/shop.svg';

import { mapState, mapActions } from 'vuex';

export default {
  data: () => ({
    defaultImage
  }),
  created() {
    this.request({ id: this.$route.params.id });
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.shops.onFetch,
      profile: (state) => state.api.shops.data?.profile || {},
      paging: (state) => state.api.shops.data?.listing_products?.paging || {},
      items: (state) => state.api.shops.data?.listing_products?.result || [],
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/shops/request',
    }),
    updatePage(page) {
      this.request({
        id: this.$route.params.id,
        page,
      });
    },
  },
};
</script>
