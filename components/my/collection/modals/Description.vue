<template>
  <v-dialog :value="editModal.visible" transition="dialog-bottom-transition" width="100%" persistent>
    <v-card class="pa-4">
      <v-card-text class="pa-0">
        <v-textarea
          :label="$t('titles.product_description')"
          :value="editModal.description"
          @change="(e) => setEditModal({ description: e })"
        />
      </v-card-text>
      <v-card-actions class="dialog-cancle-foot justify-center">
        <v-btn  @click="() => setEditModal({ visible: false, id: null, description: '' })" class="btn-gray-radius-large">
          {{ $t('buttons.cancel') }}
        </v-btn>
        <v-btn :loading="updateLoading" @click="update" class="btn-green-radius-large">{{ $t('buttons.update') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  watch: {
    updateLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.updateError) {
          const { id, description } = this.editModal;
          this.updateResultDescription({
            id,
            description,
          });
          this.setEditModal({ visible: false, id: null, description: '' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      editModal: (state) => state.my.produce.editModal,
      updateLoading: (state) => state.api.my.products.description.onFetch,
      updateError: (state) => state.api.my.products.description.error,
    }),
  },
  methods: {
    ...mapActions({
      updateDescription: 'api/my/products/description/request',
      updateResultDescription: 'api/my/not_listed/updateDescription',
      setEditModal: 'my/produce/setEditModal',
    }),
    update() {
      const { id, description } = this.editModal;
      this.updateDescription({ id, description });
    },
  },
};
</script>
