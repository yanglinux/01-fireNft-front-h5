<template>
  <div class="index-tab">    
    <v-tabs v-model="currentItem" slider-color="white" class="mytab">
      <v-tabs-slider></v-tabs-slider>
      <v-tab>
        {{ $t('product.type.fixed_price') }}
      </v-tab>
      <v-tab>
        {{ $t('product.type.auction') }}
      </v-tab>
      <div class="index-tab-sort">
        <v-menu bottom left>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text class="align-self-right pr-0" v-bind="attrs" v-on="on">
              <span>{{ sort.title }}</span>
              <v-icon right class="ml-0">mdi-menu-down</v-icon>
            </v-btn>
          </template>

          <v-list class="grey lighten-3">
            <v-list-item @click="updateSort(item)" v-for="item in sorts" :key="item.value">
              {{ item.title }}
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-tabs>    
    <v-tabs-items v-model="currentItem" class="mt-2 index-tab-box" touchless>
      <v-tab-item>
        <IndexList :items="tab1" :index="1" />
      </v-tab-item>
      <v-tab-item>
        <v-layout fill-height>
          <IndexList :items="tab2" :index="2" />
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import IndexList from '@/components/index/List.vue';
import { sorts } from '@/utils/common';

export default {
  components: { IndexList },
  props: {
    tab1: {
      type: Array,
      default: () => [],
    },
    tab2: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    const data = {
      currentItem: 'tab-Web',
      sorts: sorts.bind(this)(),
    };
    data.sort = data.sorts[0];
    return data;
  },
  methods: {
    updateSort(sort) {
      this.sort = sort;
    },
  },
};
</script>

<style scoped>
.index-tab /deep/ .theme--light.v-tabs > .v-tabs-bar{
  background: transparent;
  color: #0E7868 !important;
  caret-color: #0E7868 !important;
  position: relative;
}
.index-tab .v-tab{
  padding: 0;
  margin-right: 10px;
  font-size: 16px;
  min-width: auto;
}
.index-tab .v-tabs-slider-wrapper{
  width: 30px !important;
}
.index-tab-sort{
  position: absolute;
  top: 7px;
  right: 0;
  z-index: 0;
}
.index-tab-sort /deep/ .v-btn.v-size--default{
  font-size: 12px;
}
.index-tab-box{
  background-color: transparent;
}
</style>
