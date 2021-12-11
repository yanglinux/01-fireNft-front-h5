<template>
  <div class="mt-2">
    <v-btn block color="primary" @click="onBuy">{{ $t('buttons.buy') }}</v-btn>
    <v-dialog :value="modal" transition="dialog-bottom-transition" persistent>
      <v-card>
        <v-card-text>
          <v-row class="mt-2">
            <v-col cols="4">
              <v-img :src="item.cover_image_url" max-width="100%" />
            </v-col>
            <v-col cols="8">
              <ListItem :left="$t('product.detail.labels.product_id')" :right="item.id" />
              <ListItem :left="$t('product.detail.labels.price')" :right="price" />
              <div>
                <v-checkbox
                  class="mt-1"
                  hide-details
                  v-model="payment"
                  :value="paymentItem.value"
                  :label="$t('product.detail.labels.pay_method_bank')"
                  v-for="paymentItem in paymentItems"
                  :key="paymentItem.value"
                >
                  <template #label>
                    <span class="text-body-2">{{ paymentItem.label }}</span>
                  </template>
                </v-checkbox>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="modal = false">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :loading="loading" color="primary" @click="onPaymentSelect">{{ $t('buttons.next') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :value="paymentSelectModal" transition="dialog-bottom-transition" persistent>
      <v-card>
        <v-card-text class="pt-2">
          <v-radio-group v-model="form.card">
            <v-radio :value="1" :label="cardLabel"></v-radio>
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="paymentSelectModal = false">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :loading="orderLoading" color="primary" @click="onPayment">{{ $t('buttons.payment') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :value="orderSuccessModal" transition="dialog-bottom-transition" persistent>
      <v-card>
        <v-card-text class="pt-2">
          <div class="mt2 d-flex justify-center align-center pt-2 text-subtitle-1">
            <img height="30" src="@/assets/img/svg/sucsess.svg" class="mr-2" />
            {{ $t('message.info_payment_success') }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :loading="orderLoading" color="primary" @click="onOk">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ListItem from '@/components/ListItem.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { ListItem },
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function () {
    return {
      modal: false,
      paymentSelectModal: false,
      orderSuccessModal: false,
      payment: 2,
      paymentItems: [
        {
          value: 1,
          label: this.$t('product.detail.labels.pay_method_bank'),
        },
        {
          value: 2,
          label: this.$t('product.detail.labels.pay_method_credit_card'),
        },
      ],
      form: {
        card: 1,
      },
    };
  },
  watch: {
    orderLoading(next, prev) {
      if (next === false && prev === true && !this.orderError) {
        this.modal = false;
        this.paymentSelectModal = false;
        this.orderSuccessModal = true;
      }
    },
  },
  computed: {
    ...mapState({
      persisted: (state) => state.api.my.credit_card.data.persisted || false,
      mycard: (state) => state.api.my.credit_card.data,
      loading: (state) => state.api.my.credit_card.onFetch,
      orderLoading: (state) => state.api.my.order.onFetch,
      orderError: (state) => state.api.my.order.error,
    }),
    price() {
      const { exhibit: { fixed_price = '' } = {} } = this.item;
      return `${fixed_price.toLocaleString()}${this.$t('append.amount_unit')}`;
    },
    cardLabel() {
      const { brand, exp_month, exp_year, last4 } = this.mycard;
      return [
        brand,
        this.$t('product.detail.labels.last4') + last4,
        this.$t('product.detail.labels.exp_date') + [exp_year, exp_month].join('/'),
      ].join(' ');
    },
  },
  methods: {
    ...mapActions({
      getMyCreditCard: 'api/my/credit_card/request',
      requestProductOrder: 'api/my/order/request',
    }),
    onBuy() {
      this.modal = true;
      this.getMyCreditCard();
    },
    onPaymentSelect() {
      if (this.payment === 1) {
        this.requestProductOrder({
          id: this.item.id,
          pay_method: 'bank',
        });
      } else {
        if (!this.persisted) {
          this.$router.push('/my/credit_card');
        } else {
          this.paymentSelectModal = true;
        }
      }
    },
    onPayment() {
      this.requestProductOrder({
        id: this.item.id,
        pay_method: 'credit_card',
      });
    },
    onOk() {
      this.$router.push('/my/collection');
    },
  },
};
</script>
