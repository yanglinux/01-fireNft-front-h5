<template>
  <div>
    <v-progress-linear v-if="loading" indeterminate color="yellow darken-2"></v-progress-linear>

    <v-btn block color="primary" v-if="rerequest" @click="onRerequest">
      {{ $t('omniauth.rerequest') }}
    </v-btn>

    <!-- 二段階認証コード入力 modal -->
    <v-dialog :value="modal" transition="dialog-bottom-transition" persistent width="80vw">
      <v-card>
        <v-card-title>
          {{ $t('titles.step2') }}
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="form.otp_code"
              :rules="[(v) => !!v, (v) => v.length === 6]"
              :label="$t('user.labels.auth_code')"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="modal = false">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :disabled="!valid" :loading="loading" @click="onSubmit" color="primary">
            {{ $t('buttons.login') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- end 二段階認証コード入力 modal -->
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';
import thirdpart from '@/utils/thirdpart';

const FACEBOOK_AUTH_REREQUEST = 400;
const FACEBOOK_AUTH_TWO_ERROR = 428;

export default {
  mixins: [thirdpart],
  data() {
    return {
      modal: false,
      valid: true,
      form: { otp_code: '' },
      rerequest: false,
    };
  },
  watch: {
    // facebook auth
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.facebookLogin();
        } else {
          if (this.status === FACEBOOK_AUTH_TWO_ERROR) {
            this.modal = true;
          } else if (this.status === FACEBOOK_AUTH_REREQUEST) {
            this.rerequest = true;
            this.toast({ text: this.message, type: 'error' });
          }
        }
      }
    },
  },
  created() {
    // remove login states
    localStorage.removeItem('headers');
    this.setAuthUser({});

    // init provider
    this.providerReducers();
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.auth.facebook.onFetch,
      error: (state) => state.api.auth.facebook.error,
      status: (state) => state.api.auth.facebook.status,
      headers: (state) => state.api.auth.facebook.headers,
      data: (state) => state.api.auth.facebook.data,
      message: (state) => state.api.auth.facebook.data?.errors[0],
    }),
  },
  methods: {
    ...mapMutations('user', ['SET_AUTH_USER', 'SET_TWO_AUTH']),
    ...mapActions({
      toast: 'toast/add',
      setAuthUser: 'user/setAuthUser',
      login: 'api/user/login/request',
      facebookCallbackRequest: 'api/auth/facebook/request',
    }),
    providerReducers() {
      const { provider } = this.$route.params;
      switch (provider) {
        case 'facebook':
          {
            this.facebookAction();
          }
          break;
        default:
          this.defaultAction();
          break;
      }
    },
    defaultAction() {
      const { otp_status } = this.$route.query;
      const needTwoAtuh = otp_status && otp_status !== 'ok';
      if (needTwoAtuh) this.modal = true;
      else this.defaultLogin();

      // otp_code validate error
      if (otp_status === 'invalid') this.toast({ text: this.$t('errors.otp_invalid'), type: 'error' });
    },
    facebookAction() {
      // do somethings on init.
    },
    onSubmit() {
      /* if() */
      const { provider } = this.$route.params;
      switch (provider) {
        case 'facebook':
          this.loginWithFacebook();
          break;
        default:
          this.redirectTo(provider, 'otp_code=' + this.form.otp_code);
      }
    },
    loginWithFacebook() {
      const search = this.$route.hash.slice(1);
      let query = JSON.parse(
        '{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}'
      );
      if (form.otp_code) query.otp_code = form.otp_code;
      this.facebookCallbackRequest(query);
    },
    defaultLogin() {
      const { auth_token: accessToken, uid, client_id: client } = this.$route.query;
      const headers = {
        accessToken,
        uid,
        client,
      };
      window.localStorage.setItem('headers', JSON.stringify(headers));
      this.$router.push('/');
    },
    facebookLogin() {
      const { uid, email } = this.data;
      this.SET_AUTH_USER({
        authUser: {
          uid,
          email,
        },
      });

      let headers = {
        accessToken: response.headers['access-token'],
        uid: response.data.data.uid,
        client: response.headers['client'],
      };

      const { 'access-token': accessToken, client } = this.headers;

      window.localStorage.setItem(
        'headers',
        JSON.stringify({
          accessToken,
          uid,
          client,
        })
      );
      this.$router.push('/');
    },
    onRerequest() {
      this.redirectTo('facebook', 'auth_type=rerequest');
    },
  },
};
</script>
