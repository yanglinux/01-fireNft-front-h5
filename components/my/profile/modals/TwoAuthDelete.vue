<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="80vw">
    <v-card>
      <v-card-title>
        {{ $t('my.profile.two_auth_delete') }}
      </v-card-title>
      <v-card-text>
        <v-form v-model="valid" ref="form">
          <v-text-field :rules="[(v) => !!v]" :label="$t('user.labels.auth_code')" v-model="form.otp_code" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="hidden">{{ $t('buttons.cancel') }}</v-btn>
        <v-btn :disabled="!valid" :loading="loading" color="primary" @click="deleteTwoAuth">
          {{ $t('buttons.relieve') }}
        </v-btn>
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
  },
  data() {
    return {
      valid: false,
      form: {
        otp_code: '',
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.getTwoAuth();
          this.hidden();
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.two_auth_delete.onFetch,
      error: (state) => state.api.my.two_auth_delete.error,
    }),
  },
  methods: {
    ...mapActions({
      removeTwoAuth: 'api/my/two_auth_delete/request',
      getTwoAuth: 'api/my/two_auth/request',
    }),
    hidden() {
      this.$emit('hide');
      this.$refs.form.reset();
    },
    deleteTwoAuth() {
      this.removeTwoAuth(this.form);
    },
  },
};
</script>
