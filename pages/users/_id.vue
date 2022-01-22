<template>
  <section>    
    <div class="personal-header">
      <div class="personal-header-img">
          <v-avatar size="60" tile>
            <v-img :src="profile.image || defaultImage"></v-img>
          </v-avatar>
      </div>
      <div class="personal-header-info">
        <h2>{{ profile.nick_name }}</h2>
        <div class="share">
          <a :href="'https://www.facebook.com/' + profile.facebook" target="_blank" v-if="profile.facebook"><img src="@/assets/img/svg/share-icon1.svg" alt=""></a>
          <img src="@/assets/img/svg/share-icon1.svg" alt="" v-else>
          <a :href="'https://twitter.com/' + profile.twitter" target="_blank" v-if="profile.twitter"><img src="@/assets/img/svg/share-icon2.svg" alt=""></a>
          <img src="@/assets/img/svg/share-icon2.svg" alt="" v-else>
          <a :href="'https://www.instagram.com/' + profile.instagram" target="_blank" v-if="profile.instagram"><img src="@/assets/img/svg/share-icon3.svg" alt=""></a>
          <img src="@/assets/img/svg/share-icon3.svg" alt="" v-else>
        </div>
        <div class="info-con" style="white-space: pre-wrap; word-wrap:break-word;" v-html="autoLink(profile.introduction || '')"></div>
      </div>
    </div>
    <div class="pa-3">
      <div class="mb-4 text-h6">{{ $t('titles.user_listing_product') }}</div>
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

<style scoped>
  .share {
    height: 24px;
  }
  .share img {
    display: inline-block;
    width: 24px;
    height: 24px;
    margin-right: 16px;
  }
  </style>
