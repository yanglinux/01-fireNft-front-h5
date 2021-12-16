<template>
  <v-navigation-drawer
    @input="(e) => setLayout(['drawer', e])"
    :value="layout.drawer"
    :mini-variant="layout.miniVariant"
    :clipped="layout.clipped"
    fixed
    app
  >
    <v-list>
      <v-list-item to="/" router exact class="nobg">
        <v-list-item-content>
          <v-list-item-title v-text="$t('sidebar.artist_signup')" @click="artistSignup()" />
        </v-list-item-content>
      </v-list-item>
      <template v-if="isLogin">
        <v-divider class="mt-2 mb-2" />
        <v-list-item v-for="(item, i) in subItems" :key="item.title" :to="item.to" router exact>
          <v-list-item-content>
            <v-list-item-title v-text="$t(`${item.title}`)" />
          </v-list-item-content>
        </v-list-item>
    </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    items: [
      {
        title: 'shop',
        to: '/shop',
      },
      {
        title: 'marketplace',
        to: '/',
      },
      {
        title: 'guide',
        to: '/guide',
      },
    ],
    subItems: [
      {
        title: 'sidebar.my.collection',
        to: '/my/collection',
      },
      {
        title: 'sidebar.my.orders',
        to: '/my/orders',
      },
      {
        title: 'sidebar.my.settings',
        to: '/my/profile',
      },
      {
        title: 'sidebar.my.credit_card',
        to: '/my/credit_card',
      },
      {
        title: 'sidebar.my.exhibitExamination',
        to: '/my/exhibit_examination',
      },
      {
        title: 'sidebar.my.affiliate',
        to: '/my/affiliate',
      },
      {
        title: 'sidebar.my.favorites',
        to: '/my/favorites',
      },
      {
        title: 'sidebar.my.contacts',
        to: '/my/contacts',
      },
    ],
  }),
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
      isLogin: (state) => !!state.user.currentUser.uid,
    }),
  },
  methods: {
    ...mapActions({
      setLayout: 'app/setLayout',
      toast: 'toast/add',
    }),

    artistSignup: function() {
      this.toast({ text: this.$t('message.info_artist_signup_stop'), type: 'error' });
    },
  },
};
</script>

<style scoped>
.nobg:before{
  background: #fff !important;
}
</style>
