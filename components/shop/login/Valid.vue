<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent>
    <v-form ref="form" @submit.prevent="onSubmit" lazy-validation :disabled="loading">
      <v-card>
        <v-card-title>{{ $t('titles.step2') }}</v-card-title>
        <v-card-text>
          <v-text-field
            :rules="rules.otp_code"
            v-model="form.otp_code"
            :label="$t('user.labels.auth_code')"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="setModal({ visible: false })">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :loading="loading" color="primary" @click="onSubmit">{{ $t('buttons.login') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  layout: 'shop',
  data() {
    return {
      form: { otp_code: '' },
      rules: {
        otp_code: [(v) => !!v || this.$t('errors.otp_code_required')],
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          const headers = {
            accessToken: this.headers['access-token'],
            uid: this.data.uid,
            client: this.headers['client'],
          };
          this.setUserinfo(headers);
          this.$router.push('/shop/product/manager');
        } else {
          this.toast({ text: this.$t('errors.shop_login_otp'), type: 'error' });
          this.$refs.form.reset();
        }
      }
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      if (this.isLogin) this.$router.push('/shop/product/manager');
    }
  },
  computed: {
    ...mapState({
      visible: (state) => state.shop.user.modal.visible,
      error: (state) => state.api.shop.login.valid.error,
      data: (state) => state.api.shop.login.valid.data?.data || {},
      loading: (state) => state.api.shop.login.valid.onFetch,
      headers: (state) => state.api.shop.login.valid.headers,
      basicForm: (state) => state.shop.user.form,
    }),
    ...mapGetters({
      isLogin: 'shop/user/isLogin',
    }),
  },
  methods: {
    ...mapActions({
      login: 'api/shop/login/valid/request',
      setUserinfo: 'shop/user/setUserinfo',
      toast: 'toast/add',
      setModal: 'shop/user/setModal',
    }),
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.login({ ...this.basicForm, ...this.form });
      }
    },
  },
};
</script>
