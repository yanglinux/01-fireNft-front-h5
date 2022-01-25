<template>
  <v-footer :absolute="!layout.fixed" class="d-flex justify-around footer" app>
    <img src="@/assets/img/logo1.svg" style="width: 97px" />
    <div class="footer-nav">
      <dl>
        <dt>{{ $t('footer.about') }}</dt>
        <dd><a href="#"
               target="blank">{{ $t('footer.company_overview') }}</a></dd>
      </dl>
      <dl>
        <dt>{{ $t('footer.help_guide') }}</dt>
        <dd><a href='/my/contacts'>{{ $t('footer.inquiry') }}</a></dd>
        <dd><a href='#'
               target="blank">{{ $t('footer.faq') }}</a></dd>
      </dl>
      <dl>
        <dt>{{ $t('footer.privacy_andterms') }}</dt>
        <dd><a href='#'
               target='blank'>{{ $t('footer.privacy_policy') }}</a></dd>
        <dd><a href='#'
               target='blank'>{{ $t('footer.utilization_protocol') }}</a></dd>
      </dl>
    </div>
  </v-footer>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      layout: (state) => state.app.layout,
    }),
  },
  methods: {
    ...mapActions({
      setLayout: 'app/setLayout',
    }),
  },
};
</script>

<style scoped>
.footer{  
  padding: 20px;
  background: linear-gradient(214deg, #0E7868 0%, #369465 100%);
  color: #fff;
  justify-content: space-between;
  font-size: 12px;
}
.footer-nav {
  width: 180px;
}
.footer-nav dl{
  padding: 5px 0;
}
.footer-nav dl dd{
  opacity: 0.8;
}
.footer-nav a{
  color: #fff
}
</style>
