<template>
  <section>
    <Banner /> 
    <div class="py-3">
      <v-tabs v-model="tab" class="my-tab px-3">
        <v-tabs-slider></v-tabs-slider>
        <v-tab>
          {{ $t('my.collection.collection') }}
        </v-tab>
        <v-tab v-if="false">
          {{ $t('my.collection.exchange_list') }}
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab" class="my-tab-items" touchless>
        <v-tab-item>
          <v-tabs v-model="subtab" class="mytab my-sub-tab px-3" >
            <v-tabs-slider></v-tabs-slider>
            <v-tab>
              {{ $t('my.collection.status.created') }}
            </v-tab>
            <v-tab>
              {{ $t('my.collection.status.listing') }}
            </v-tab>
            <v-tab>
              {{ $t('my.collection.status.sold') }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="subtab" class="my-sub-tab-items" touchless>
            <v-tab-item><NotListedList /></v-tab-item>
            <v-tab-item><ListingList /></v-tab-item>
            <v-tab-item><SoldList /></v-tab-item>
          </v-tabs-items>
        </v-tab-item>
        <v-tab-item><ExchangeList /></v-tab-item>
      </v-tabs-items>
    </div>
  </section>
</template>

<script>
import Banner from '@/layouts/my/Banner';
import ExchangeList from '@/components/my/collection/ExchangeList.vue';
import NotListedList from '@/components/my/collection/NotListedList';
import ListingList from '@/components/my/collection/ListingList';
import SoldList from '@/components/my/collection/SoldList';
import { mapState } from 'vuex';

export default {
  components: {
    Banner,
    ExchangeList,
    NotListedList,
    ListingList,
    SoldList,
  },
  data() {
    return {
      tab: null,
      subtab: null,
    };
  },
  watch: {
    exhibitLoading(next, prev) {
      if (next === false && prev === true && !this.exhibitError) {
        this.subtab = 1;
      }
    },
  },
  computed: {
    ...mapState({
      exhibitLoading: (state) => state.api.my.exhibit.onFetch,
      exhibitError: (state) => state.api.my.exhibit.error,
    }),
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/my.scss';
</style>
