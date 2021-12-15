<template>
  <div>
    <div class="mt-4 mb-4 d-flex justify-center align-center">
      <span class="text-h6">{{ $t('signup.title') }}</span>
    </div>
    <v-form v-model="valid" ref="form" @submit.prevent="onSubmit" :disabled="loading" class="register-form">
      <v-text-field v-model="email" :rules="rules.email" :label="$t('signup.email')" required></v-text-field>

      <v-text-field
        v-model="password"
        type="password"
        :rules="rules.password"
        :label="$t('signup.password')"
        required
      ></v-text-field>

      <v-text-field
        v-model="password_confirmation"
        type="password"
        :rules="[...rules.confirm_password, passwordConfirmationRule]"
        :label="$t('signup.password_confirmation')"
        required
      ></v-text-field>

      <div class="d-flex justify-center">
          <v-btn :disabled="!valid" block :loading="loading" color="primary" type="submit"  class="btn-green-radius-large">
            {{ $t('buttons.signup') }}
          </v-btn>
      </div>
    </v-form>
    <div class="register-lines"><p>Or Sign Up With</p></div>
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
        email: [
          (v) => !!v || this.$t('errors.email_required'),
          (email) => {
            const re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase()) || this.$t('errors.email_required');
          },
        ],
        password: [(v) => !!v || this.$t('errors.password_required')],
        confirm_password: [(v) => !!v || this.$t('errors.confirm_password_required')],
      },
      email: '',
      password: '',
      password_confirmation: '',
      valid: true,
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.toast({ text: this.$t('signup.successed'), type: 'success' });
          this.$router.push('/');
        } else {
          this.toast({ text: this.message.full_messages[0], type: 'error' });
        }
      }
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      localStorage.removeItem('headers');
      this.setAuthUser({});
    }
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.user.signup.onFetch,
      headers: (state) => state.api.user.signup.headers,
      error: (state) => state.api.user.signup.error,
      message: (state) => state.api.user.signup.data.errors || {},
    }),
    passwordConfirmationRule() {
      return () => {
        return this.password === this.password_confirmation || this.$t('errors.confirm_password_match');
      };
    },
  },
  methods: {
    ...mapActions({
      signup: 'api/user/signup/request',
      toast: 'toast/add',
      setAuthUser: 'user/setAuthUser',
    }),
    ...mapMutations('user', ['SET_AUTH_USER', 'SET_TWO_AUTH']),
    onSubmit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.signup({
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          invite_code: this.$route.query.c || null,
        });
      }
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/login.scss';
</style>