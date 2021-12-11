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

      <MyProfileModalsTwoAuth :visible="twoAuthModal" :src="twoauth.provisioning_uri || ''" @hide="hideTwoAuthModal" />

      <MyProfileModalsTwoAuthDelete :visible="deleteTwoAuthModal" @hide="hideTwoAuthModalDelete" />

      <MyProfileModalsPassword :visible="passwordModal" @hide="hidePasswordModal" />
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
    };
  },
  created() {
    if (this.$nuxt.layoutName) this.getTwoAuth();
  },
  computed: {
    ...mapState({
      twoauth: (state) => state.api.my.two_auth.data,
    }),
  },
  methods: {
    ...mapActions({
      getTwoAuth: 'api/my/two_auth/request',
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
  },
};
</script>
