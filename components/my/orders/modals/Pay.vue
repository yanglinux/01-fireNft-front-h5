<template>
  <div v-if="item">
    <v-dialog :value="!!item" transition="dialog-bottom-transition" persistent width="80vw">
      <v-card>
        <v-img :src="item.product.cover_image_url" max-width="100%" />
        <v-card-text>
          <v-row class="mt-2">
            <div class="text-h6">{{ item.product.title }}</div>
            <v-col cols="12">
              <ListItem :left="$t('product.detail.labels.product_id')" :right="item.id" />
              <ListItem :left="$t('product.detail.labels.price')" :right="price" />
              <div>
                <v-radio-group v-model="payment">
                  <v-radio
                    class="mt-1"
                    hide-details
                    :value="paymentItem.value"
                    :label="$t('product.detail.labels.pay_method_bank')"
                    v-for="paymentItem in listPaymentItems"
                    :key="paymentItem.value"
                  >
                    <template #label>
                      <span class="text-body-2">{{ paymentItem.label }}</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="$emit('close')">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :loading="loading" color="primary" @click="onPaymentSelect">{{ $t('buttons.next') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog :value="paymentSelectModal" transition="dialog-bottom-transition" persistent width="80vw">
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

    <v-dialog :value="orderSuccessModal" transition="dialog-bottom-transition" persistent width="80vw">
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
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    close: {
      type: Function,
      default: () => {},
    },
    ok: {
      type: Function,
      default: () => {},
    },
  },
  data: function () {
    return {
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
      if (next === false && prev === true) {
        if (!this.orderError) {
          this.paymentSelectModal = false;
          this.orderSuccessModal = true;
        } else {
          this.toast({
            text: this.orderMessage,
            type: 'error',
          });
        }
      }
    },
    item(next) {
      if (next) {
        if (this.type === 'marketplace') this.getMyCreditCardMarketplace();
        else this.getMyCreditCard();
      }
    },
  },
  computed: {
    ...mapState({
      persistedShop: (state) => state.api.my.credit_card.shop_info.data.persisted || false,
      mycardShop: (state) => state.api.my.credit_card.shop_info.data,
      loadingShop: (state) => state.api.my.credit_card.shop_info.onFetch,
      persistedMarketplace: (state) => state.api.my.credit_card.marketplace_info.data.persisted || false,
      mycardMarketplace: (state) => state.api.my.credit_card.marketplace_info.data,
      loadingMarketplace: (state) => state.api.my.credit_card.marketplace_info.onFetch,
      orderLoading: (state) => state.api.my.orders.payment.onFetch,
      orderError: (state) => state.api.my.orders.payment.error,
      orderMessage: (state) => state.api.my.orders.payment.data?.errors?.base || '',
    }),
    persisted() {
      return this.type === 'marketplace' ? this.persistedMarketplace : this.persistedShop;
    },
    mycard() {
      return this.type === 'marketplace' ? this.mycardMarketplace : this.mycardShop;
    },
    loading() {
      return this.type === 'marketplace' ? this.loadingMarketplace : this.loadingShop;
    },
    price() {
      const { amount = 0 } = this.item || {};
      return `${amount.toLocaleString()}${this.$t('append.amount_unit')}`;
    },
    cardLabel() {
      const { brand, exp_month, exp_year, last4 } = this.mycard || {};
      return [
        brand,
        this.$t('product.detail.labels.last4') + last4,
        this.$t('product.detail.labels.exp_date') + [exp_year, exp_month].join('/'),
      ].join(' ');
    },
    type() {
      return this.item?.seller?.seller_type === 'Shop' ? 'marketplace' : 'payout';
    },
    userOwned() {
      return this.item?.seller?.seller_type === 'User';
    },
    listPaymentItems() {
      let r = [...this.paymentItems];
      if (this.userOwned) r = r.slice(1);
      return r;
    },
  },
  methods: {
    ...mapActions({
      getMyCreditCard: 'api/my/credit_card/shop_info/request',
      getMyCreditCardMarketplace: 'api/my/credit_card/marketplace_info/request',
      requestProductOrder: 'api/my/orders/payment/request',
      toast: 'toast/add',
    }),
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
      this.$emit('ok');
      this.paymentSelectModal = false;
      this.orderSuccessModal = false;
      this.payment = 2;
    },
  },
};
</script>
