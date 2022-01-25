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
          :length="paging.total_pages"
        ></v-pagination>
      </v-col>
    </v-row>

    <DescriptionModal />
    <StepperModal />
    <DetailModal />
    <ReplacementModal />
  </v-container>
</template>

<script>
import Product from '@/components/my/collection/Product.vue';
import DescriptionModal from '@/components/my/collection/modals/Description';
import StepperModal from '@/components/my/collection/modals/Stepper';
import DetailModal from '@/components/my/collection/modals/Detail';
import ReplacementModal from '@/components/my/collection/modals/Replacement';
import { mapState, mapActions } from 'vuex';

export default {
  components: { Product, DescriptionModal, StepperModal, DetailModal, ReplacementModal },
  created() {
    this.getItems();
  },
  computed: {
    ...mapState({
      items: (state) => state.api.my.not_listed.data?.result || [],
      loading: (state) => state.api.my.not_listed.onFetch,
      paging: (state) => state.api.my.not_listed.data?.paging || {},
    }),
  },
  methods: {
    ...mapActions({
      getItems: 'api/my/not_listed/request',
    }),
    updatePage(page) {
      this.getItems({ page });
    },
  },
};
</script>
