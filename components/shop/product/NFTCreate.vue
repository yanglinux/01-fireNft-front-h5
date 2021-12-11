<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-card-text class="pa-4">
        <div class="text-body-2">{{ $t('titles.nft_create_confirm') }}</div>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="hidden">{{ $t('buttons.cancel') }}</v-btn>
        <v-btn :loading="loading" color="primary" @click="create">
          {{ $t('buttons.confirm') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    id: {
      type: [String, Number],
    },
    hide: {
      type: Function,
      default: () => {},
    },
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.hidden();
          this.refreshItems();
        } else {
          this.toast({ text: this.message, type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.shop.product.nft.create.onFetch,
      error: (state) => state.api.shop.product.nft.create.error,
      message: (state) => state.api.shop.product.nft.create.message,
    }),
    passwordConfirmationRule() {
      return () => {
        return this.new_password === this.confirm_password;
      };
    },
  },
  methods: {
    ...mapActions({
      request: 'api/shop/product/nft/create/request',
      refreshItems: 'api/shop/product/items/request',
      toast: 'toast/add',
    }),
    hidden() {
      this.$emit('hide');
    },
    create() {
      this.request({ id: this.id });
    },
  },
};
</script>
