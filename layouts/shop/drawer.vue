<template>
  <v-navigation-drawer @input="(e) => setLayout(['rightDrawer', e])" :value="layout.rightDrawer" :right="layout.right" temporary fixed>
    <v-list>
      <v-list-item @click.native="setLayout(['right', !layout.right])">
        <v-list-item-action>
          <v-icon light> mdi-repeat </v-icon>
        </v-list-item-action>
        <v-list-item-title>Switch drawer (click me)</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
