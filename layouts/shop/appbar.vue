<template>
  <v-app-bar :clipped-left="layout.clipped" fixed app>    
    <v-toolbar-title @click="() => $router.push('/')">
        <img src="@/assets/img/logo.svg" style="width: 115px" />
      </v-toolbar-title>   
    <v-spacer />
    <v-app-bar-nav-icon @click.stop="setLayout(['drawer', !layout.drawer])" />
    <v-btn v-show="false" icon @click.stop="setLayout(['miniVariant', !layout.miniVariant])">
      <v-icon>mdi-{{ `chevron-${layout.miniVariant ? 'right' : 'left'}` }}</v-icon>
    </v-btn>
    <v-btn icon @click.stop="setLayout(['clipped', !layout.clipped])" v-show="false">
      <v-icon>mdi-application</v-icon>
    </v-btn>
    <v-btn icon @click.stop="setLayout(['fixed', !layout.fixed])" v-show="false">
      <v-icon>mdi-minus</v-icon>
    </v-btn>
    <v-btn icon @click.stop="setLayout(['rightDrawer', !layout.rightDrawer])" v-show="false">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <Language />
    <v-btn text>{{ uid }}</v-btn>
    <v-menu left bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item @click="logout">
          <v-list-item-title>{{ $t('header.logout') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({}),
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
      uid: (state) => state.shop.user.userinfo?.uid,
    }),
  },
  methods: {
    ...mapActions({
      setLayout: 'app/setLayout',
      setUserinfo: 'shop/user/setUserinfo',
    }),
    logout() {
      this.setUserinfo({});
      this.$router.push('/shop/login');
    },
  },
};
</script>
