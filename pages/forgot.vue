<template>
  <div class="forget">
    <div class="mt-4 mb-4 d-flex justify-center align-center">
      <span class="text-h6">{{ $t('forgot.title') }}</span>
    </div>
    <v-form v-model="valid" @submit.prevent="onSubmit" class="register-form">    
        <v-text-field :rules="rules.email" v-model="form.email" :label="$t('forgot.email')"></v-text-field>
        <div class="d-flex justify-center mt-2">
          <v-btn :loading="loading" type="submit" :disabled="!valid" block class="btn-green-radius-large">
            {{ $t('buttons.sent') }}
          </v-btn>
        </div>     
    </v-form>
  </div>
</template>

<script>
  import { mapState, mapActions, mapGetters } from 'vuex';
  
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
              return re.test(String(email).toLowerCase()) || this.$t('errors.email_format_invalid');
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
      ...mapGetters({
        lang: 'app/lang',
      }),
    },
    methods: {
      ...mapActions({
        request: 'api/auth/password/request',
        toast: 'toast/add',
      }),
      onSubmit() {
        this.request({
          ...this.form,
          lang: this.lang,
        });
      },
    },
  };
  </script>

<style scoped>
@import '@/assets/css/pages/login.scss';
</style>

<style lang="scss" scoped>
.forget{
    height: 100%;
    padding: 20px;
    border-radius: 16px;
    background: #FFFFFF;
}
</style>
