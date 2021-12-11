<template>
  <div>
    <v-card class="mt-2">
      <v-card-text>
        <ListItem :left="$t('product.detail.labels.start_price')" :right="startPirce" />
        <ListItem :left="$t('product.detail.labels.price')" :right="currentPrice" />
      </v-card-text>
    </v-card>
    <div class="mt-2 text-body-2" v-if="item.start_at && !isOver">
      {{ $t('product.detail.labels.auction_end') }}
      <span class="text-h6">{{ lastDate }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  data: () => ({
    lastDate: '',
    t: null,
  }),
  created() {
    this.t = setInterval(() => {
      this.mathDate();
    }, 1000);
  },
  computed: {
    startPirce() {
      const { start_price = '' } = this.item;
      return `${start_price.toLocaleString()}${this.$t('append.amount_unit')}`;
    },
    currentPrice() {
      const { start_price, current_price } = this.item;
      const price = current_price || start_price || '';
      return `${price.toLocaleString()}${this.$t('append.amount_unit')}`;
    },
    isOver() {
      const { end_at } = this.item;
      const start = moment();
      return moment(end_at) <= start;
    },
  },
  methods: {
    mathDate() {
      const { end_at } = this.item;
      const start = moment();
      const end = moment(end_at);
      const days = end.diff(start, 'days');
      const hours = end.diff(start, 'hours') % 24;
      const minutes = end.diff(start, 'minutes') % 60;
      const seconds = end.diff(start, 'seconds') % 60;
      const datestr = [hours, minutes, seconds]
        .map((x) => {
          return `${x}`.padStart(2, '0');
        })
        .join(':');
      this.lastDate = `${days} Days ${datestr}`;
    },
  },
  beforeDestroy() {
    clearInterval(this.t);
    this.t = null;
  },
};
</script>
