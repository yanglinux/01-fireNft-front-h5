<template>
  <div class="login">
    <div class="mt-4 mb-4 d-flex justify-center align-center">
      <span class="text-h6">{{ $t('user.welcome') }}</span>
    </div>
    <v-form ref="form" @submit.prevent="onSubmit" lazy-validation :disabled="loading" class="register-form">
      <v-text-field v-model="form.email" :rules="rules.email" :label="$t('user.labels.email')" required></v-text-field>

      <v-text-field
        v-model="form.password"
        type="password"
        :rules="rules.password"
        :label="$t('user.labels.password')"
        required
      ></v-text-field>

      <v-dialog :value="modal" transition="dialog-bottom-transition" persistent width="80vw">
        <v-card>
          <v-card-title>
            {{ $t('titles.step2') }}
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-if="actived"
              v-model="form.otp_code"
              :rules="[(v) => !!v]"
              :label="$t('user.labels.auth_code')"
              required
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn text @click="modal = false">{{ $t('buttons.cancel') }}</v-btn>
            <v-btn @click="onSubmit" color="primary">{{ $t('buttons.login') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <div class="d-flex justify-end">
          <NuxtLink to="/forgot">{{ $t('user.password-reset') }}</NuxtLink>
      </div>
      <div class="d-flex justify-center mt-4">
          <v-btn block :loading="loading" type="submit" class="btn-green-radius-large">{{ $t('buttons.login') }}</v-btn>
      </div>
    </v-form>

    <div class="d-flex justify-center register-link">
      <NuxtLink to="/signup" class="link-black">{{ $t('user.labels.register') }}</NuxtLink>
    </div>

    <div class="register-lines"><p>OR Login in with</p></div>
    <div class="register-share">
      <div class="register-share-box">
        <a @click="redirectTo('facebook')">
          <img src="@/assets/img/svg/share-icon1.svg" alt="" />
        </a>
      </div>
      <div class="register-share-box">
        <a @click="redirectTo('twitter')">
          <img src="@/assets/img/svg/share-icon2.svg" alt="" />
        </a>
      </div>
      <div class="register-share-box">
        <a @click="redirectTo('line')">
          <img src="@/assets/img/svg/share-icon3.svg" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters, mapMutations } from 'vuex';
import thirdpart from '@/utils/thirdpart';
const TWO_AUTH_STATUS = 428;

export default {
  mixins: [thirdpart],
  layout: 'shop',
  data() {
    return {
      rules: {
        email: [(v) => !!v || this.$t('errors.email_required')],
        password: [(v) => !!v || this.$t('errors.password_required')],
      },
      form: {
        email: '',
        password: '',
        otp_code: '',
      },
      valid: true,
      modal: false,
      actived: false,
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (TWO_AUTH_STATUS === this.status) {
          this.actived = true;
          this.modal = true;
        } else if (!this.error) {
          const { uid, email } = this.data;
          const { ['access-token']: accessToken, client } = this.headers;
          this.SET_AUTH_USER({ authUser: { uid, email } });
          const headers = { accessToken, uid, client };
          window.localStorage.setItem('headers', JSON.stringify(headers));
        } else {
          this.toast({ text: this.message[0], type: 'error' });
        }
      }
    },
    isLogin(next, prev) {
      if (next === true && prev === false) {
        this.$router.push('/');
      }
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      localStorage.removeItem('headers');
      this.setAuthUser({});
    }

    console.log(this.$route);
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.user.login.onFetch,
      headers: (state) => state.api.user.login.headers,
      error: (state) => state.api.user.login.error,
      message: (state) => state.api.user.login.data.errors || [],
      status: (state) => state.api.user.login.status,
      data: (state) => state.api.user.login.data?.data || {},
      isLogin: (state) => !!state.user.currentUser.uid,
    }),
  },
  methods: {
    ...mapActions({
      login: 'api/user/login/request',
      toast: 'toast/add',
      setAuthUser: 'user/setAuthUser',
      requestTwoAuth: 'api/my/two_auth/request',
    }),
    ...mapMutations('user', ['SET_AUTH_USER', 'SET_TWO_AUTH']),
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.login(this.form);
      } else if (this.actived && !this.modal) {
        this.modal = true;
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/login.scss';
</style>
