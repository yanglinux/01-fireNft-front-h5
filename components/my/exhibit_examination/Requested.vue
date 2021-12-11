<template>
  <v-card>
    <v-card-text>
      <v-alert type="error">
        <v-row align="center">
          <v-col class="grow">
            {{ $t('my.exhibitExamination.pay_procedures') }}
          </v-col>
          <v-col class="shrink">
            <v-btn @click="redirectTenant" color="warning" small class="ml-auto">
              {{ $t('my.exhibitExamination.tenant_url') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-alert>
      <v-data-table
        disable-sort
        fixed-header
        hide-default-footer
        mobile-breakpoint="0"
        :headers="headers"
        :items="items"
        class="elevation-1 custom mt-2"
      >
        <template #no-data>
          {{ $t('titles.no_data') }}
        </template>
        <template #item.available_date="row">
          {{ formatDate(row.item.available_date) }}
        </template>
        <template #item.status="row">
          <span :class="row.item.status">{{ row.item.status }}</span>
        </template>
        <template #item.cover_image_url="row">
          <img :src="row.item.cover_image_url" class="ma-2" />
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      examination: (state) => state.api.my.exhibit_examination.data || {},
    }),
    items() {
      const { reviewed_brands = [] } = this.examination.payjp_tenant || {};
      return reviewed_brands;
    },
    headers() {
      return [
        { value: 'available_date', text: this.$t('my.exhibitExamination.fields.available_date') },
        { value: 'brand', text: this.$t('my.exhibitExamination.fields.brand') },
        { value: 'status', text: this.$t('my.exhibitExamination.fields.status') },
      ];
    },
  },
  methods: {
    redirectTenant() {
      const { url = '' } = this.examination.payjp_tenant || {};
      window.open(url, '_blank');
    },
    formatDate(date) {
      return moment.utc(date * 1000).format('YYYY/MM/DD HH:mm:ss');
    },
  },
};
</script>

<style scoped>
span.passed {
  color: green;
}

span.declined {
  color: red;
}
</style>
