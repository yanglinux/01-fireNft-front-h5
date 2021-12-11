<template>
  <v-form ref="form" v-model="valid" @submit.prevent="onSubmit" lazy-validation>
    <v-text-field v-model="form.otp_code" :rules="[]" :label="$t('user.labels.otp_code')" required></v-text-field>

    <v-btn color="primary" type="submit">{{ $t('buttons.login') }}</v-btn>
  </v-form>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
export default {
  layout: 'shop',
  data() {
    return {
      form: { otp_code: '' },
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
          this.form.otp_code = '';
        }
      }
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      if (this.isLogin) this.$router.push('/shop/product/manager');
      else if (!this.loaded) this.$router.push('/shop/login');
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.api.shop.login.login.error,
      data: (state) => state.api.shop.login.login.data?.data || {},
      loaded: (state) => state.api.shop.login.login.loaded,
      loading: (state) => state.api.shop.login.login.onFetch,
      headers: (state) => state.api.shop.login.login.headers,
      basicForm: (state) => state.shop.user.form,
    }),
    ...mapGetters({
      isLogin: 'shop/user/isLogin',
    }),
  },
  methods: {
    ...mapActions({
      login: 'api/shop/login/login/request',
      setUserinfo: 'shop/user/setUserinfo',
      toast: 'toast/add',
    }),
    onSubmit() {
      this.login({ ...this.basicForm, ...this.form });
    },
  },
};
</script>
