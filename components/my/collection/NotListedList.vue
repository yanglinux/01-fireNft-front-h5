<template>
  <div class="pt-4">
    <v-row>
      <v-col cols="12" v-if="!items.length">
        <NoData />
      </v-col>
      <v-col cols="6" v-for="item in items1" :key="item.id">
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

    <DescriptionModal />
    <StepperModal />
    <DetailModal />
    <ReplacementModal />
  </div>
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
      paging: (state) => state.api.my.not_listed.data?.result?.paging || {},
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
