<template>
  <v-card>
    <v-card-text>
      <v-btn block color="primary" v-if="twoauth.actived" @click="deleteTwoAuthModal = true">
        {{ $t('my.profile.two_auth_completed') }}
      </v-btn>
      <v-btn @click="twoAuthModal = true" block color="primary" v-else>{{ $t('my.profile.set_two_auth') }}</v-btn>
      <v-btn @click="passwordModal = true" block color="primary" class="mt-2">
        {{ $t('my.profile.password_change') }}
      </v-btn>
      <v-btn @click="bankModal = true" block color="primary" class="mt-2">
        {{ $t('buttons.bankcode_manage') }}
      </v-btn>

      <ShopSettingTwoAuth :visible="twoAuthModal" :src="twoauth.provisioning_uri || ''" @hide="hideTwoAuthModal" />

      <ShopSettingTwoAuthDelete :visible="deleteTwoAuthModal" @hide="hideTwoAuthModalDelete" />

      <ShopSettingPassword :visible="passwordModal" @hide="hidePasswordModal" />

      <ShopSettingBank :visible="bankModal" @hide="hideBankModal" />
    </v-card-text>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      twoAuthModal: false,
      passwordModal: false,
      deleteTwoAuthModal: false,
      bankModal: false,
    };
  },
  created() {
    if (this.$nuxt.layoutName) this.getTwoAuth();
  },
  computed: {
    ...mapState({
      twoauth: (state) => state.api.shop.setting.two_auth.data,
    }),
  },
  methods: {
    ...mapActions({
      getTwoAuth: 'api/shop/setting/two_auth/request',
    }),
    hideTwoAuthModal() {
      this.twoAuthModal = false;
    },
    hideTwoAuthModalDelete() {
      this.deleteTwoAuthModal = false;
    },
    hidePasswordModal() {
      this.passwordModal = false;
    },
    hideBankModal() {
      this.bankModal = false;
    },
  },
};
</script>
