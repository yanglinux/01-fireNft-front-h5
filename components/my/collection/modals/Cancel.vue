<template>
  <v-dialog :value="modal.visible" transition="dialog-bottom-transition" persistent>
    <v-card class="pa-3">
      <v-card-text class="py-3">
        {{ $t('titles.ask_for_cancel_sale') }}
      </v-card-text>
      <v-card-actions class="dialog-cancle-foot justify-center">        
        <v-btn class="btn-gray-radius-large" @click="close">
          {{ $t('buttons.cancel') }}
        </v-btn>
        <v-btn :loading="loading" class="btn-green-radius-large" @click="onCancel">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (this.error) {
          this.toast({ text: this.$t('errors.common'), type: 'error' });
        } else {
          this.getListingItems();
          this.getNotListedItems();
          this.close();
        }
      }
    },
  },
  computed: {
    ...mapState({
      modal: (state) => state.my.produce.saleModal,
      loading: (state) => state.api.my.cancel.onFetch,
      error: (state) => state.api.my.cancel.error,
    }),
  },
  methods: {
    ...mapActions({
      setModal: 'my/produce/setSaleModal',
      cancelSale: 'api/my/cancel/request',
      toast: 'toast/add',
      getListingItems: 'api/my/listing/request',
      getNotListedItems: 'api/my/not_listed/request',
    }),
    onCancel() {
      this.cancelSale({ id: this.modal.id });
    },
    close() {
      this.setModal({ visible: false, id: null });
    },
  },
};
</script>
