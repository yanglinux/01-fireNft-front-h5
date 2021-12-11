<template>
  <v-card>
    <v-card-text class="pa-1">
      <v-data-table
        disable-sort
        fixed-header
        hide-default-footer
        mobile-breakpoint="0"
        stickyHeader
        :headers="headers"
        :items="items"
        class="elevation-1 custom mt-2"
        height="40vh"
      >
        <template #no-data>
          {{ $t('titles.no_data') }}
        </template>
        <template #item.created_at="row">
          {{ formatTime(row.item.created_at) }}
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const headers = [
      { value: 'bidder.nick_name', text: this.$t('product.detail.fields.nick_name') },
      { value: 'price', text: this.$t('product.detail.fields.price') },
      { value: 'created_at', text: this.$t('product.detail.fields.created_at') },
    ];
    let data = { headers };
    return data;
  },
  methods: {
    formatTime(created_at) {
      let str = '';
      const now = moment();
      const seconds = now.diff(moment(created_at), 'seconds');
      if (seconds <= 0) {
        str = '1 seconds';
      } else if (seconds < 60) {
        str = `${seconds} seconds`;
      } else if (seconds < 3600) {
        str = `${Math.ceil(seconds / 60)} minutes`;
      } else if (seconds < 86400) {
        str = `${Math.ceil(seconds / 3600)} hours`;
      } else {
        str = `${Math.ceil(seconds / 86400)} days`;
      }

      return str
        .replace('seconds', this.$t('product.detail.labels.seconds_ago'))
        .replace('minutes', this.$t('product.detail.labels.minutes_ago'))
        .replace('hours', this.$t('product.detail.labels.hours_ago'))
        .replace('days', this.$t('product.detail.labels.days_ago'));
    },
  },
};
</script>
