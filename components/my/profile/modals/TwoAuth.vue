<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent>
    <v-card>
      <v-card-title>
        {{ $t('my.profile.set_two_auth') }}
      </v-card-title>
      <v-card-text>
        <div class="text-body-2">{{ $t('titles.google_qr_tip') }}</div>
        <v-img v-if="qrurl" :src="qrurl" />

        <v-divider class="mt-2 mb-2" />
        <v-text-field :label="$t('user.labels.auth_code')" v-model="form.otp_code" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="hidden">{{ $t('buttons.cancel') }}</v-btn>
        <v-btn :loading="loading" color="primary" @click="setTwoAuth">{{ $t('buttons.step2_settings') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import QRCode from 'qrcode';
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    hide: {
      type: Function,
      default: () => {},
    },
    src: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      qrurl: '',
      form: {
        otp_code: '',
      },
    };
  },
  watch: {
    src(next) {
      if (next) {
        QRCode.toDataURL(next, (err, url) => {
          if (!err) this.qrurl = url;
        });
      }
    },
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.getTwoAuth();
          this.hidden();
        } else {
          const msg = [];
          Object.keys(this.message).forEach((x) => msg.push(`${x}:${this.message[x]}`));
          this.toast({ text: msg.join('<br />'), type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.two_auth_update.onFetch,
      error: (state) => state.api.my.two_auth_update.error,
      message: (state) => state.api.my.two_auth_update.data?.errors || {},
    }),
  },
  methods: {
    ...mapActions({
      updateTwoAuth: 'api/my/two_auth_update/request',
      getTwoAuth: 'api/my/two_auth/request',
      toast: 'toast/add',
    }),
    hidden() {
      this.form.otp_code = '';
      this.$emit('hide');
    },
    setTwoAuth() {
      this.updateTwoAuth(this.form);
    },
  },
};
</script>
