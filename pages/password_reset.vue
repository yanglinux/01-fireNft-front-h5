<template>
  <div>
      <div class="mt-4 mb-4 d-flex justify-center align-center">
          <span class="text-h6">{{ $t('forgot.password') }}</span>
        </div>
    <v-form v-model="valid" class="register-form">      
          <v-text-field
            type="password"
            :rules="rules.password"
            v-model="password"
            :label="$t('forgot.password')"
          ></v-text-field>

          <v-text-field
            type="password"
            :rules="[...rules.password_confirmation, passwordConfirmationRule]"
            v-model="password_confirmation"
            :label="$t('forgot.password_confirmation')"
          ></v-text-field>
        
        <div class="d-flex justify-center mt-2">
          <v-btn block class="btn-green-radius-large">{{ $t('buttons.ok') }}</v-btn>
        </div>
    </v-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      password: '',
      password_confirmation: '',
      rules: {
        password: [(v) => !!v],
        password_confirmation: [(v) => !!v],
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.toast({ text: this.$t('forgot.verified'), type: 'success' });
          this.$router.push('/login');
        } else {
          this.toast({ text: this.message, type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.auth.reset.onFetch,
      error: (state) => state.api.auth.reset.error,
      message: (state) => state.api.auth.reset.data?.errors[0] || '',
    }),
    passwordConfirmationRule() {
      return () => {
        return this.password === this.password_confirmation || this.$t('message.info_confirm_password_wrong');
      };
    },
  },
  methods: {
    ...mapActions({
      request: 'api/auth/reset/request',
      toast: 'toast/add',
    }),
    onSubmit() {
      const { 'access-token': accessToken, client, uid } = this.$route.query;

      this.request({
        data: {
          password: this.password,
          password_confirmation: this.password_confirmation,
        },
        headers: {
          'access-token': accessToken,
          client,
          uid,
          Accept: '*/*',
        },
      });
    },
  },
};
</script>
<style scoped>
    @import '@/assets/css/pages/login.scss';
    </style>