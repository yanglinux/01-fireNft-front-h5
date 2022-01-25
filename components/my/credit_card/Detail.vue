<template>
  <v-card>
    <v-card-text>
      <div class="subtitle-2">{{ $t('my.credit_card.created') }}</div>
      <v-divider />
      <div class="mt-2">{{ $t('my.credit_card.card_number') }} **** **** **** {{ mycard.last4 }}</div>
      <v-btn class="mt-4 btn-green-radius-large" @click="modal = true" block>{{ $t('buttons.unregister') }}</v-btn>

      <v-dialog :value="modal" transition="dialog-bottom-transition" persistent>
        <v-card>
          <v-card-text class="pa-4">
            {{ $t('message.info_credit_card_unregister') }}
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text @click="modal = false">{{ $t('buttons.cancel') }}</v-btn>
            <v-btn :loading="deleteMarketplaceLoading || deleteShopLoading" color="primary" @click="deleteCreditCard">
              {{ $t('buttons.confirm') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card-text>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    mycard: {
      type: Object,
      default: () => ({}),
    },
    type: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    modal: false,
  }),
  watch: {
    deleteMarketplaceLoading(next, prev) {
      if (next === false && prev === true && this.type === 'marketplace') {
        if (!this.deleteMarketplaceError) {
          this.getMyCreditCardMarketplace();
          this.modal = false;
        } else {
          this.toast({ text: this.$t('message.error_delete_credit_card_failure'), type: 'error' });
        }
      }
    },
    deleteShopLoading(next, prev) {
      if (next === false && prev === true && this.type === 'payout') {
        if (!this.deleteShopError) {
          this.getMyCreditCardShop();
          this.modal = false;
        } else {
          this.toast({ text: this.$t('message.error_delete_credit_card_failure'), type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      deleteMarketplaceLoading: (state) => state.api.my.credit_card.marketplace_delete.onFetch,
      deleteMarketplaceError: (state) => state.api.my.credit_card.marketplace_delete.error,
      deleteShopLoading: (state) => state.api.my.credit_card.shop_delete.onFetch,
      deleteShopError: (state) => state.api.my.credit_card.shop_delete.error,
    }),
  },
  methods: {
    ...mapActions({
      getMyCreditCardShop: 'api/my/credit_card/shop_info/request',
      getMyCreditCardMarketplace: 'api/my/credit_card/marketplace_info/request',
      requestDeleteShopCreditCard: 'api/my/credit_card/shop_delete/request',
      requestDeleteMarketplaceCreditCard: 'api/my/credit_card/marketplace_delete/request',
      toast: 'toast/add',
    }),
    deleteCreditCard() {
      if (this.type === 'payout') this.requestDeleteShopCreditCard();
      else this.requestDeleteMarketplaceCreditCard();
    },
  },
};
</script>
