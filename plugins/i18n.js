import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

export default ({ app, route, store }) => {
  let lang = store.state.app.language;
  if (/^\/shop\//.test(route.path)) lang = store.state.shop.app.language;
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: lang || 'ja',
    fallbackLocale: 'ja',
    silentTranslationWarn: process.env.NODE_ENV === 'production',
    sync: true,
    messages: {
      en: require('~/locales/en.json'),
      ja: require('~/locales/ja.json'),
      zh: require('~/locales/zh.json'),
    },
  });

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`;
    }

    return `/${app.i18n.locale}/${link}`;
  };
};
