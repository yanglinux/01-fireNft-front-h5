<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-form v-model="valid" ref="form" :disabled="error || loading || updateLoading">
      <v-card>
        <v-card-text>
          <v-text-field :rules="rule" :label="$t('product.detail.labels.bank')" v-model="form.bank" />
          <v-text-field :rules="rule" :label="$t('product.detail.labels.branch')" v-model="form.branch" />
          <v-text-field :rules="rule" :label="$t('product.detail.labels.account')" v-model="form.account" />
          <v-text-field :rules="rule" :label="$t('product.detail.labels.transfer_name')" v-model="form.name" />
          <v-text-field :rules="rule" :label="$t('titles.name_kana')" v-model="form.name_kana" />
          <v-text-field v-if="actived" :rules="rule" :label="$t('titles.two_auth_code')" v-model="form.otp_code" />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="hidden">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :disabled="!valid" :loading="loading" color="primary" @click="onSubmit">
            {{ $t('buttons.update') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
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
      branch: '',
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
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.shop.setting.bank.onFetch,
      info: (state) => state.api.shop.setting.bank.data,
      error: (state) => state.api.shop.setting.bank.error,
      actived: (state) => state.api.shop.setting.two_auth.data.actived,
      updateLoading: (state) => state.api.shop.setting.bank_update.onFetch,
      updateError: (state) => state.api.shop.setting.bank_update.error,
    }),
  },
  methods: {
    ...mapActions({
      getInfo: 'api/shop/setting/bank/request',
      getTwoAuth: 'api/my/two_auth/request',
      updateBankInfo: 'api/shop/setting/bank_update/request',
    }),
    hidden() {
      this.$refs.form.reset();
      this.$emit('hide');
    },
    onSubmit() {
      this.updateBankInfo(this.form);
    },
  },
};
</script>

<style scoped>
.border {
  width: 100%;
}
</style>
