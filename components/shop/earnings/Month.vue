<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-card-text class="pa-2">
        <v-data-table
          disable-sort
          fixed-header
          hide-default-footer
          mobile-breakpoint="0"
          :loading="loading"
          :headers="headers"
          :items="items"
          :items-per-page="25"
          class="elevation-1 custom mt-2"
        >
          <template #no-data>
            {{ $t('titles.no_data') }}
          </template>
          <template #item.month="row">{{ dateFormat(row.item.month) }}</template>
          <template #item.total="row">{{ row.item.amount - row.item.platform_fee }}JPY</template>
          <template #item.actions="row">
            <v-btn :disabled="csvLoading" @click="onCSVDownload(row.item.month)">
              {{ $t('buttons.csv_download') }}
            </v-btn>
          </template>
        </v-data-table>
        <v-pagination
          :disabled="loading"
          @input="updatePage"
          :value="paging.current_page || 1"
          :length="Math.ceil(paging.total_count / paging.per_page) || 1"
        ></v-pagination>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="closeModal">{{ $t('buttons.ok') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data: function () {
    const headers = [
      {
        value: 'month',
        text: this.$t('titles.month'),
      },
      {
        value: 'total',
        text: this.$t('titles.total_revenue'),
      },
      {
        value: 'actions',
        text: '',
      },
    ];

    return { headers, csvName: '' };
  },
  watch: {
    csvLoading(next, prev) {
      if (next === false && prev === true && !this.csvError) {
        const url = window.URL.createObjectURL(new Blob([this.csv], { type: 'application/csv' }));
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = this.csvName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      }
    },
  },
  created() {
    this.request();
  },
  computed: {
    ...mapState({
      items: (state) => state.api.shop.earnings.monthly.data?.result || [],
      paging: (state) => state.api.shop.earnings.monthly.data?.paging || {},
      loading: (state) => state.api.shop.earnings.monthly.onFetch,
      csv: (state) => state.api.shop.earnings.csv.data,
      csvError: (state) => state.api.shop.earnings.csv.error,
      csvLoading: (state) => state.api.shop.earnings.csv.onFetch,
      visible: (state) => state.shop.earnings.monthModal.visible,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/shop/earnings/monthly/request',
      downloadCSV: 'api/shop/earnings/csv/request',
      setModal: 'shop/earnings/setMonthModal',
    }),
    updatePage(page) {
      this.request({ page });
    },
    closeModal() {
      this.setModal({ visible: false });
    },
    dateFormat(date) {
      return date.replace(/(\d{4})(\d{2})/, `$1${this.$t('titles.year')}$2${this.$t('titles.month')}`);
    },
    onCSVDownload(date) {
      const query = {
        'q[completed_at_on_month]': date.replace(/(\d{4})(\d{2})/, '$1-$2-01'),
      };
      this.csvName = this.dateFormat(date) + '.csv';
      this.downloadCSV(query);
    },
  },
};
</script>

<style scoped>
.empty {
  padding: 50px;
}
</style>
