<template>
  <v-dialog :value="item.visible" transition="dialog-bottom-transition" persistent>
    <v-card>
      <v-card-title>{{ item.title }}</v-card-title>
      <v-card-text class="pt-2">
        <v-img :src="item.cover_image_url" />
        <div class="text-subtitle-1">{{ $t('product.detail.titles.detail') }}</div>
        <v-divider />
        <div class="mt-2 mb-2" style="min-height: 80px">{{ item.description }}</div>
        <v-divider class="mb-2" />
        <ContactDetail :address="item.contract_address" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onHide">
          {{ $t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      item: (state) => state.my.notproduce.modal,
    }),
  },
  methods: {
    ...mapActions({
      setModal: 'my/notproduce/setModal',
    }),
    onHide() {
      this.setModal({
        visible: false,
        title: null,
        description: null,
        contract_address: null,
        cover_image_url: null,
      });
    },
  },
};
</script>
