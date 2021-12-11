<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-card-title>
        {{ $t('my.profile.password_change') }}
      </v-card-title>
      <v-card-text>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            type="password"
            :rules="rules.old_password"
            :label="$t('my.profile.old_password')"
            v-model="old_password"
          />
          <v-text-field
            type="password"
            :rules="rules.new_password"
            :label="$t('my.profile.new_password')"
            v-model="new_password"
          />
          <v-text-field
            type="password"
            :rules="[...rules.confirm_password, passwordConfirmationRule]"
            :label="$t('my.profile.confirm_password')"
            v-model="confirm_password"
          />
          <v-text-field v-if="actived" :rules="[(v) => !!v]" :label="$t('my.profile.auth_code')" v-model="otp_code" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="hidden">{{ $t('buttons.cancel') }}</v-btn>
        <v-btn :disabled="!valid" :loading="loading" color="primary" @click="onSubmit">
          {{ $t('buttons.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
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
      valid: true,
      old_password: '',
      new_password: '',
      confirm_password: '',
      otp_code: '',
      rules: {
        old_password: [(v) => !!v],
        new_password: [(v) => !!v],
        confirm_password: [(v) => !!v],
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.hidden();
          this.toast({ text: this.$t('message.info_password_change_success'), type: 'success' });
        } else {
          this.toast({ text: this.$t('message.info_old_password_wrong'), type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.shop.setting.password.onFetch,
      error: (state) => state.api.shop.setting.password.error,
      actived: (state) => state.api.shop.setting.two_auth.data.actived,
    }),
    passwordConfirmationRule() {
      return () => {
        return this.new_password === this.confirm_password;
      };
    },
  },
  methods: {
    ...mapActions({
      updateShopPassword: 'api/shop/setting/password/request',
      toast: 'toast/add',
      getTwoAuth: 'api/my/two_auth/request',
    }),
    hidden() {
      this.$refs.form.reset();
      this.$emit('hide');
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        const form = {
          password: this.new_password,
          current_password: this.old_password,
          password_confirmation: this.confirm_password,
        };
        if (this.otp_code) form['otp_code'] = this.otp_code;
        this.updateShopPassword(form);
      }
    },
  },
};
</script>
