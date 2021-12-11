<template>
  <div>
    <v-form v-model="valid" @submit.prevent="onSubmit">
      <v-card>
        <v-card-title>{{ $t('forgot.title') }}</v-card-title>
        <v-card-text>
          <v-text-field :rules="rules.email" v-model="form.email" :label="$t('forgot.email')"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn :loading="loading" type="submit" :disabled="!valid" color="primary" block>
            {{ $t('buttons.sent') }}
          </v-btn>
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
      form: { email: '', redirect_url: `${window.location.protocol}//${window.location.host}/password_reset` },
      rules: {
        email: [
          (v) => !!v || this.$t('errors.email_required'),
          (email) => {
            const re =
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase()) || this.$t('errors.email_required');
          },
        ],
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.toast({ text: this.$t('forgot.successed'), type: 'success' });
          this.$router.push('/login');
        } else {
          this.toast({ text: this.message, type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.auth.password.onFetch,
      error: (state) => state.api.auth.password.error,
      message: (state) => state.api.auth.password.data?.errors[0] || '',
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/auth/password/request',
      toast: 'toast/add',
    }),
    onSubmit() {
      this.request(this.form);
    },
  },
};
</script>
