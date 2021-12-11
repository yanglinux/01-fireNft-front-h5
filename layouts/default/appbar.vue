<template>
  <v-app-bar :clipped-left="layout.clipped" fixed app class="myappbar">
    <v-toolbar-title @click="() => $router.push('/')">
      <img src="@/assets/img/logo.svg" style="width: 115px" />
    </v-toolbar-title>    
    <v-app-bar-nav-icon @click.stop="setLayout(['drawer', !layout.drawer])" class="nav-icon" />
    <v-spacer />
    <v-btn small v-if="!isLogin" @click="$router.push('/signup')" class="btn-white-radius">{{ $t('header.signup') }}</v-btn>
    <v-btn small v-if="!isLogin" @click="$router.push('/login')" class="ml-2 btn-green-radius">
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
  background: rgba(255,255,255,0.38) !important;
  box-shadow: 0 0 0 rgba(0,0,0,0) !important;
  ::v-deep .v-toolbar__content {
    padding-right: 0;
    padding-left: 10px;
  }
}
.nav-icon{
  width: 24px !important;
  .mdi-menu{
    background: url(../../assets/img/svg/icon-menu.svg) no-repeat;
    background-size: 100% 100%;
  }
  .mdi-menu::before{
    content: '';    
  }
}
.btn-white-radius{
  padding: 0 5px !important;
  height: 32px !important;
  line-height: 30px !important;
  background: #fff !important;
  border:solid 1px #0E7868;
  border-radius: 16px;
  color: #0E7868;  
}
.btn-white-radius.v-btn--is-elevated{
  box-shadow: 0 0 0 rgba(255, 255, 255, 0)
}
.btn-green-radius{
  padding: 0 5px !important;
  height: 32px !important;
  line-height: 32px !important;
  background: #0E7868 !important;
  border-radius: 16px;
  color: #fff;  
}
.btn-green-radius.v-btn--is-elevated{
  box-shadow: 0 0 0 rgba(255, 255, 255, 0)
}
</style>
