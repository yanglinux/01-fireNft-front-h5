<template>
  <v-card class="mb-2">
    <div class="d-flex">
      <div class="flex-grow-1">
        <v-card-title>
          {{ currentMonth }}
        </v-card-title>
        <v-card-text>
          <div class="text-body-1">{{ $t('titles.current_month_sales') }}：{{ currentSales }}</div>
        </v-card-text>
      </div>
      <div class="d-flex justify-center align-center mr-2">
        <v-btn color="primary" @click="setMonthModal({ visible: true })">{{ $t('buttons.confirm_history') }}</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentSales: (state) => state.api.shop.earnings.list.data?.sales_of_current_month,
    }),
    currentMonth() {
      return moment().format('YYYY-MM');
    },
  },
  methods: {
    ...mapActions({
      setMonthModal: 'shop/earnings/setMonthModal',
    }),
  },
};
</script>
