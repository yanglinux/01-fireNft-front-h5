<template>
  <v-app-bar :clipped-left="layout.clipped" fixed app class="myappbar">
    <v-toolbar-title @click="() => $router.push('/')">
      <img src="@/assets/img/logo.png" style="width: 93px" />
    </v-toolbar-title>
    <v-app-bar-nav-icon @click.stop="setLayout(['drawer', !layout.drawer])" />
    <v-spacer />
    <v-btn small v-if="!isLogin" @click="$router.push('/signup')">{{ $t('header.signup') }}</v-btn>
    <v-btn small v-if="!isLogin" @click="$router.push('/login')" dark color="black" class="ml-2">
      {{ $t('header.login') }}
    </v-btn>
    <Language />
    <v-menu v-if="isLogin" left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-avatar size="36" v-bind="attrs" v-on="on" class="mr-2">
          <img :src="photoURL" />
        </v-avatar>
      </template>

      <v-list dense>
        <v-list-item>
          {{ displayName }}
        </v-list-item>
        <v-divider />
        <v-list-item @click="redirectMyProfile">
          <v-list-item-title>
            {{ $t('header.user_setting') }}
          </v-list-item-title>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-title>{{ $t('header.logout') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import defaultAvatarImage from '@/assets/img/head.jpg';

export default {
  data: () => ({}),
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
      isLogin: (state) => !!state.user.currentUser.uid,
      displayName: (state) => state.user.currentUser.displayName || state.user.currentUser.uid,
      photoURL: (state) => state.user.currentUser.photoURL || defaultAvatarImage,
    }),
  },
  methods: {
    ...mapActions({
      setLayout: 'app/setLayout',
      setUserinfo: 'shop/user/setUserinfo',
    }),
    logout() {
      this.setUserinfo({});
      this.$router.push('/login');
    },
    redirectMyProfile() {
      this.$router.push('/my/profile');
    },
  },
};
</script>

<style lang="scss" scoped>
.myappbar {
  ::v-deep .v-toolbar__content {
    padding-right: 0;
  }
}
</style>
