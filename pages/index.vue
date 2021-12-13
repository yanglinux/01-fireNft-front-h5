<template>
  <div class="pa-3">
    <v-row justify="center" align="center" class="index-main">
      <v-col class="ml-0 mr-0 ma-0 search" cols="12">
        <v-text-field solo dense flat hide-details rounded v-model="form.search" class="search-inp">
          <template #append>
            <img src="@/assets/img/svg/ss.svg" class="search-icon" @click="search" />
          </template>
        </v-text-field>
      </v-col>
      <v-col class="pa-0 ma-0" cols="12">
        <Banner />
      </v-col>
      <v-col class="ma-0" cols="12">
        <Trend :items="data.hot_products || []" />
      </v-col>     
      <v-col class="ma-0" cols="12">
        <New :items="data.latest_products || []" />
      </v-col>
      <v-col class="ma-0" cols="12">
        <Tab ref="tab" :tab1="data.fixed_price_products" :tab2="data.auction_products" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Banner from '@/components/index/Banner.vue';
import Trend from '@/components/index/Trend.vue';
import Ad from '@/components/index/Ad.vue';
import New from '@/components/index/New.vue';
import Tab from '@/components/index/Tab.vue';

import { mapState, mapActions } from 'vuex';

export default {
  data: function () {
    return {
      form: {
        search: '',
      }
    };
  },
  components: { Banner, Trend, Ad, New, Tab },
  beforeCreate: function() {
    document.getElementsByTagName('body')[0].setAttribute('id', 'index');
  },
  beforeDestroy() {
    document.getElementsByTagName('body')[0].removeAttribute('id');
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.request({ sort_by: 'hot_desc' });
    }
  },
  mounted() {
    if (this.$nuxt.layoutName) {
      this.$watch(
        () => {
          return this.$refs.tab.sort;
        },
        ({ value }) => {
          this.request({ sort_by: value });
        }
      );
    }
  },
  computed: {
    ...mapState({
      data: (state) => state.api.user.top.data,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/user/top/request',
    }),
    search() {
      this.$router.push(`/products?s=${this.form.search}`);
    },
  },
  
};
</script>

<style scoped>
.index-main{
  position: relative;
  z-index: 0;
}

.search {
  background: transparent;
  position: absolute;
  top: 56px;
  left: 0;
  right: 0;
  z-index: 2;
}

/deep/ .search-inp.theme--light.v-text-field--solo > .v-input__control > .v-input__slot{
  background-color: rgba(245,245,245,.58)
}

/deep/ .search-inp.theme--light.v-input input, .theme--light.v-input textarea{
  color: #0E7868;
}

.search-icon {
  margin-right: -12px;
}
</style>

<style>
#index .v-main{
  padding-top: 0 !important;
  background: #F2F2F2
}

</style>
