<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn text v-bind="attrs" v-on="on" size="24">
        {{ currentLanuage.title }}
        <v-icon right>mdi-chevron-down</v-icon>
      </v-btn>
    </template>

    <v-list dense>
      <v-list-item v-for="language in languages" :key="language.id" @click="updateLanguage(language.id)">
        <v-list-item-title class="d-flex align-center">
          <img :src="language.image" class="mr-2" />
          {{ language.title }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import ry from '@/assets/img/svg/ry.svg';
import zw from '@/assets/img/svg/zw.svg';
import yy from '@/assets/img/svg/yy.svg';
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  data: () => ({
    isShowLanguage: false,
    languages: [
      {
        title: '日本語',
        image: ry,
        id: 'ja',
      },
      {
        title: '中文',
        image: zw,
        id: 'zh',
      },
      {
        title: 'English',
        image: yy,
        id: 'en',
      },
    ],
  }),
  computed: {
    ...mapState({
      isLogin: (state) => !!state.user.currentUser.uid,
      language: (state) => state.app.language,
      shopLanguage: (state) => state.shop.app.language,
    }),
    ...mapGetters({
      isShopLogin: 'shop/user/isLogin',
    }),
    currentLanuage() {
      const isShop = /^\/shop\//.test(this.$route.path);
      const lang = isShop ? this.shopLanguage : this.language;
      const [langObj] = this.languages.filter((x) => x.id === lang);
      return langObj;
    },
  },
  methods: {
    ...mapActions({
      setLanguage: 'app/setLanguage',
      setShopLanguage: 'shop/app/setLanguage',
      setLanguageRequest: 'api/my/lang/request',
      setShopLanguageRequest: 'api/shop/lang/request',
    }),
    updateLanguage(id) {
      this.$i18n.locale = id;
      const isShop = /^\/shop\//.test(this.$route.path);
      const selected = isShop ? 'shop' : 'my';
      const config = {
        my: {
          method: 'setLanguage',
          request: 'setLanguageRequest',
          islogin: this.isLogin,
        },
        shop: {
          method: 'setShopLanguage',
          request: 'setShopLanguageRequest',
          islogin: this.isShopLogin,
        },
      };

      this[config[selected].method](id);

      if (config[selected].islogin) {
        this[config[selected].request]({ lang: id });
      }
      this.isShowLanguage = false;
    },
  },
};
</script>
