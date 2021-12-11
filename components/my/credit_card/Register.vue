<template>
  <v-card>
    <v-card-title>{{ $t('my.credit_card.title') }}</v-card-title>
    <v-card-text>
      <div ref="cardNumber" id="card-number" class="card-field mt-4"></div>
      <div ref="cardExpiry" id="card-expiry" class="card-field mt-4"></div>
      <div ref="cardCvc" id="card-cvc" class="card-field mt-4"></div>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :loading="loadingPayjp" block color="primary" @click="registerCreditCard">
        {{ $t('buttons.credit_card_register') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data() {
    return {
      form: {},
      payjp: null,
      loadingPayjp: false,
    };
  },
  watch: {
    registerLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.registerError) {
          this.getMyCreditCard();
        } else {
          this.toast({ text: this.$t('message.error_create_credit_card_failure'), type: 'error' });
        }
      }
    },
  },
  mounted() {
    const elements = this.$payjp.elements();
    const style = {
      base: {
        padding: '8px',
        fontSize: '16px',
        lineHeight: '30px',
      },
    };
    const pay = {};

    [
      ['cardNumber', '#card-number'],
      ['cardExpiry', '#card-expiry'],
      ['cardCvc', '#card-cvc'],
    ].forEach(([varname, id]) => {
      pay[varname] = elements.create(varname, { style });
      pay[varname].mount(id);
      pay[varname].on('ready', () => {
        const p = this.$refs[varname].querySelector('iframe');
        p.style.height = '30px';
      });
    });

    this.payjp = pay.cardNumber;
  },
  computed: {
    ...mapState({
      registerError: (state) => state.api.my.credit_card_register.error,
      registerLoading: (state) => state.api.my.credit_card_register.onFetch,
    }),
  },
  methods: {
    ...mapActions({
      getMyCreditCard: 'api/my/credit_card/request',
      requestCreditCardRegister: 'api/my/credit_card_register/request',
      toast: 'toast/add',
    }),
    async registerCreditCard() {
      this.loadingPayjp = true;
      const { error, id: card_token } = await this.$payjp.createToken(this.payjp);

      if (error) {
        this.toast({ text: error.message, type: 'error' });
      } else {
        await this.requestCreditCardRegister({ card_token });
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
