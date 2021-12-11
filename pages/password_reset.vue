<template>
  <div>
    <v-form v-model="valid">
      <v-card>
        <div class="pa-2 text-subtitle-1">
          <b>{{ $t('forgot.password') }}</b>
        </div>

        <v-card-text>
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
        </v-card-text>

        <v-card-actions>
          <v-btn block color="primary">{{ $t('buttons.ok') }}</v-btn>
        </v-card-actions>
      </v-card>
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
