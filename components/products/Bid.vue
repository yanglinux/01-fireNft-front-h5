<template>
  <div class="mt-2" v-if="!isOver">
    <v-btn block color="primary" @click="bidModal = true">{{ $t('buttons.auction') }}</v-btn>
    <v-dialog :value="bidModal" transition="dialog-bottom-transition" persistent width="80vw">
      <v-card>
        <v-card-title>{{ $t('buttons.auction') }}</v-card-title>
        <v-card-text>
          <ListItem :left="$t('product.detail.labels.start_price')" :right="startPirce" />
          <ListItem :left="$t('product.detail.labels.price')" :right="currentPrice" />
          <v-divider class="mt-2 mb-2" />

          <div class="text-body-1">
            <b>{{ $t('product.detail.labels.bid_price') }}</b>
            <span class="ml-2 text-body-2">{{ $t('product.detail.labels.bid_unit') }} {{ bidUnit }}</span>
          </div>
          <div>
            <v-text-field hide-details v-model="form.price"></v-text-field>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="bidModal = false">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn color="primary" :loading="loading" @click="onBid">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog :value="bidSuccessModal" transition="dialog-bottom-transition" persistent width="80vw">
      <v-card>
        <v-card-text class="pt-2">
          <div class="mt2 d-flex justify-center align-center pt-2 text-subtitle-1">
            <img height="30" src="@/assets/img/svg/sucsess.svg" class="mr-2" />
            {{ $t('message.info_auction_success') }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="loading" color="primary" @click="onOk">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  components: { ListItem },
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    id: {
      type: [Number, String],
    },
  },
  data() {
    return {
      bidModal: false,
      bidSuccessModal: false,
      form: {
        price: 0,
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev == true && !this.error) {
        this.bidSuccessModal = true;
      }
    },
  },
  created() {
    const { current_price = 0, bid_unit = 0 } = this.item;
    this.form.price = current_price + bid_unit;
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.bid.onFetch,
      error: (state) => state.api.my.bid.error,
    }),
    startPirce() {
      const { start_price = '' } = this.item;
      return `${start_price.toLocaleString()}${this.$t('append.amount_unit')}`;
    },
    currentPrice() {
      const { start_price, current_price } = this.item;
      const price = current_price || start_price || '';
      return `${price.toLocaleString()}${this.$t('append.amount_unit')}`;
    },
    bidUnit() {
      const { bid_unit } = this.item;
      return bid_unit ? bid_unit.toLocaleString() + this.$t('append.amount_unit') : '';
    },
    isOver() {
      console.log(moment(this.item.end_at) <= moment());
      return moment(this.item.end_at) <= moment();
    },
  },
  methods: {
    ...mapActions({
      requestBid: 'api/my/bid/request',
      request: 'api/user/product_detail/request',
    }),
    onBid() {
      this.requestBid({
        id: this.item.id,
        ...this.form,
      });
    },
    onOk() {
      this.bidSuccessModal = false;
      this.bidModal = false;
      this.request({ id: this.id });
    },
  },
};
</script>
