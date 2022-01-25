<template>
  <div>
    <div ref="cc"></div>
    <v-card>
      <v-card-text>
        <div ref="cardNumber" :id="`card-number-${name}`" class="card-field mt-4"></div>
        <div ref="cardExpiry" :id="`card-expiry-${name}`" class="card-field mt-4"></div>
        <div ref="cardCvc" :id="`card-cvc-${name}`" class="card-field mt-4"></div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn :loading="loadingPayjp" block @click="registerCreditCard" class="btn-green-radius-large">
          {{ $t('buttons.credit_card_register') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  props: {
    name: {
      type: String,
      default: 'default',
    },
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {},
      payjp: null,
      loadingPayjp: false,
      instance: null,
      pay: null,
    };
  },
  watch: {
    registerShopLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.registerShopError) {
          this.getMyCreditCardShop();
        } else {
          this.toast({ text: this.$t('message.error_create_credit_card_failure'), type: 'error' });
        }
      }
    },
    registerMarketplaceLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.registerMarketplaceError) {
          this.getMyCreditCardMarketplace();
        } else {
          this.toast({ text: this.$t('message.error_create_credit_card_failure'), type: 'error' });
        }
      }
    },
  },
  beforeDestroy() {
    [('cardNumber', 'cardExpiry', 'cardCvc')].forEach((el) => {
      this.pay[el].unmount();
    });

    const [iframe] = document.querySelectorAll('iframe[name^="_payjpController"]') || [];
    if (iframe) {
      iframe.parentNode.removeChild(iframe);
    }
    this.$refs.cc.innerHTML = '';
    window.Payjp = null;
  },
  async mounted() {
    const key = this.type === 'marketplace' ? process.env.PAYJP_KEY_B2C : process.env.PAYJP_KEY_C2C;
    await this.create();
    this.instance = window.Payjp(key);
    const elements = this.instance.elements();
    const style = {
      base: {
        padding: '8px',
        fontSize: '16px',
        lineHeight: '30px',
      },
    };
    const pay = {};

    [
      ['cardNumber', '#card-number-' + this.name],
      ['cardExpiry', '#card-expiry-' + this.name],
      ['cardCvc', '#card-cvc-' + this.name],
    ].forEach(([varname, id]) => {
      pay[varname] = elements.create(varname, { style });
      pay[varname].mount(id);
      pay[varname].on('ready', () => {
        const p = this.$refs[varname].querySelector('iframe');
        p.style.height = '30px';
      });
    });
    this.pay = pay;
    this.payjp = pay.cardNumber;
  },
  computed: {
    ...mapState({
      registerShopError: (state) => state.api.my.credit_card.shop_update.error,
      registerMarketplaceError: (state) => state.api.my.credit_card.marketplace_update.error,
      registerShopLoading: (state) => state.api.my.credit_card.shop_update.onFetch,
      registerMarketplaceLoading: (state) => state.api.my.credit_card.marketplace_update.onFetch,
    }),
  },
  methods: {
    ...mapActions({
      getMyCreditCardShop: 'api/my/credit_card/shop_info/request',
      getMyCreditCardMarketplace: 'api/my/credit_card/marketplace_info/request',
      requestShopCreditCardRegister: 'api/my/credit_card/shop_update/request',
      requestMarketplaceCreditCardRegister: 'api/my/credit_card/marketplace_update/request',
      toast: 'toast/add',
    }),
    async create() {
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://js.pay.jp/v2/pay.js';
        this.$refs.cc.appendChild(script);
        const onload = () => {
          resolve();
        };
        script.addEventListener('load', onload);
        script.addEventListener('error', (err) => {
          script.removeEventListener('load', onload);
          reject(new Error(`Failed to load`));
        });
      });
    },
    async registerCreditCard() {
      this.loadingPayjp = true;
      const { error, id: card_token } = await this.instance.createToken(this.payjp);

      if (error) {
        this.toast({ text: error.message, type: 'error' });
      } else {
        if (this.type === 'payout') await this.requestShopCreditCardRegister({ card_token });
        else await this.requestMarketplaceCreditCardRegister({ card_token });
      }
      this.loadingPayjp = false;
    },
  },
};
</script>

<style scoped>
.card-field {
  height: 30px;
  border-bottom: 1px solid gray;
}
</style>
