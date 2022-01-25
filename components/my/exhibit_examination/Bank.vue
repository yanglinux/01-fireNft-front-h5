<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-form v-model="valid" ref="form" :disabled="error || loading || updateLoading">
      <v-card>
        <v-card-text>
          <v-autocomplete
            :rules="rule"
            v-model="form.bank_code"
            :items="bankItems"
            :label="$t('product.detail.labels.bank')"
          ></v-autocomplete>
          <v-autocomplete
            :disabled="!form.bank_code"
            :rules="rule"
            v-model="form.branch_code"
            :items="branchItems"
            :label="$t('product.detail.labels.branch')"
          ></v-autocomplete>
          <v-text-field :rules="rule" :label="$t('product.detail.labels.account')" v-model="form.account" />
          <v-text-field :rules="rule" :label="$t('product.detail.labels.transfer_name')" v-model="form.name" />
          <v-text-field :rules="rule" :label="$t('titles.name_kana')" v-model="form.name_kana" />
          <v-text-field v-if="actived" :rules="rule" :label="$t('titles.two_auth_code')" v-model="form.otp_code" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="hidden">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :disabled="!valid" :loading="updateLoading" color="primary" @click="onSubmit">
            {{ $t('buttons.update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import zenginCode from 'zengin-code';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Function,
      default: () => {},
    },
  },
  data: () => ({
    valid: true,
    form: {
      bank: '',
      bank_code: '',
      branch: '',
      branch_code: '',
      account: '',
      name: '',
      account_type: 'normal',
      name_kana: '',
      otp_code: '',
    },
    rule: [(v) => !!v],
  }),
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          Object.keys(this.info).forEach((x) => {
            if (this.form.hasOwnProperty(x)) this.form[x] = this.info[x];
          });
        }
      }
    },
    visible(next, prev) {
      if (next === true && prev === false) {
        this.getInfo();
        this.getTwoAuth();
      }
    },
    ['form.bank_code'](next) {
      if (next) {
        this.form.branch = '';
        this.form.branch_code = '';
        this.form.bank = zenginCode[next]?.name;
      }
    },
    ['form.branch_code'](next) {
      if (next) {
        this.form.branch = zenginCode[this.form.bank_code]?.branches[next]?.name;
      }
    },
    updateLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.updateError) {
          this.requestCheck();
        } else {
          this.toast({ text: this.$t('message.error_exhibit_examination_failure'), type: 'info' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.bank.onFetch,
      info: (state) => state.api.my.bank.data,
      error: (state) => state.api.my.bank.error,
      actived: (state) => state.api.my.two_auth.data.actived,
      updateLoading: (state) => state.api.my.set_exhibit_examination.onFetch,
      updateError: (state) => state.api.my.set_exhibit_examination.error,
    }),
    bankItems() {
      let res = [];
      Object.keys(zenginCode).forEach((value) => {
        res.push({ value, text: value + ' ' + zenginCode[value].name });
      });
      return res;
    },
    branchItems() {
      let res = [];
      if (this.form.bank_code) {
        const branches = zenginCode[this.form.bank_code].branches;
        Object.keys(branches).forEach((value) => {
          res.push({ value, text: value + ' ' + branches[value].name });
        });
      }
      return res;
    },
  },
  methods: {
    ...mapActions({
      getInfo: 'api/my/bank/info/request',
      getTwoAuth: 'api/my/two_auth/request',
      request: 'api/my/set_exhibit_examination/request',
      requestCheck: 'api/my/exhibit_examination/request',
      toast: 'toast/add',
    }),
    hidden() {
      this.$refs.form.reset();
      this.$emit('hide');
    },
    onSubmit() {
      this.request(this.form);
    },
  },
};
</script>

<style scoped>
.border {
  width: 100%;
}
</style>
