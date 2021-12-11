<template>
  <div>
    <v-form ref="form" @submit.prevent="onSubmit" lazy-validation :disabled="loading">
      <v-text-field
        v-model="form.shop_id"
        :rules="rules.shop_id"
        :label="$t('user.labels.shop_id')"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.login_id"
        :rules="rules.login_id"
        :label="$t('user.labels.login_id')"
        required
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        type="password"
        :rules="rules.password"
        :label="$t('user.labels.password')"
        required
      ></v-text-field>

      <v-row align="center" justify="center" class="mt-2">
        <v-btn :loading="loading" color="primary" type="submit">{{ $t('buttons.next') }}</v-btn>
      </v-row>
    </v-form>
    <Valid />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Valid from '@/components/shop/login/Valid';

const TWO_AUTH_STATUS = 428;

export default {
  layout: 'shop',
  components: { Valid },
  data() {
    return {
      rules: {
        shop_id: [(v) => !!v || this.$t('shop_id_required')],
        login_id: [(v) => !!v || this.$t('login_id_required')],
        password: [(v) => !!v || this.$t('password_required')],
      },
      form: {
        shop_id: '',
        login_id: '',
        password: '',
      },
      valid: true,
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (TWO_AUTH_STATUS === this.status) {
          this.setForm(this.form);
          this.setModal({ visible: true });
        } else if (!this.error) {
          const headers = {
            accessToken: this.headers['access-token'],
            uid: this.data.uid,
            client: this.headers['client'],
          };
          this.setUserinfo(headers);
        } else {
          this.toast({ text: this.$t('errors.shop_login'), type: 'error' });
        }
      }
    },
    isLogin(next, prev) {
      if (next === true && prev === false) {
        this.$router.push('/shop/product/manager');
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
      loading: (state) => state.api.shop.login.login.onFetch,
      headers: (state) => state.api.shop.login.login.headers,
      error: (state) => state.api.shop.login.login.error,
      status: (state) => state.api.shop.login.login.status,
      data: (state) => state.api.shop.login.login.data?.data || {},
    }),
    ...mapGetters({
      isLogin: 'shop/user/isLogin',
    }),
  },
  methods: {
    ...mapActions({
      login: 'api/shop/login/login/request',
      setForm: 'shop/user/setForm',
      setModal: 'shop/user/setModal',
      setUserinfo: 'shop/user/setUserinfo',
      toast: 'toast/add',
    }),
    onSubmit() {
      if (this.$refs.form.validate()) this.login(this.form);
    },
  },
};
</script>
