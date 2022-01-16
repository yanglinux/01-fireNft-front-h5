<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="80vw">
    <v-card>
      <v-card-text class="pt-4 text-body-1">
        {{ text }}
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn v-if="showCancelBtn" text @click="close">
          {{ cancelText || $t('buttons.cancel') }}
        </v-btn>
        <v-btn :loading="loading" color="primary" @click="onOk">{{ okText || 'OK' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    okText: {
      type: String,
    },
    cancelText: {
      type: String,
    },
    ok: {
      type: Function,
      default: () => {},
    },
    cancel: {
      type: Function,
      default: () => {},
    },
    hide: {
      type: Function,
      default: () => {},
    },
    visible: {
      type: Boolean,
    },
    text: {
      type: String,
      default: '',
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    showCancelBtn() {
      let r = true;
      if (this.cancel === false) r = false;
      return r;
    },
  },
  methods: {
    close() {
      this.$emit('hide');
    },
    onOk() {
      this.$emit('ok');
    },
  },
};
</script>
