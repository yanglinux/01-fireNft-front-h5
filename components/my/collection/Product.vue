<template>
  <v-card>
    <Label :text="$t('product.status.created')" />
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-img
        :src="item.cover_image_url"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        @click.prevent="showDetail"
      >
        <v-card-title class="pb-1 text-body-2" v-text="item.title"></v-card-title>
        <v-card-text class="pa-1 d-flex justify-end">
          <v-btn
            dark
            outlined
            x-small
            @click.stop.prevent="() => setEditModal({ visible: true, description: item.description, id: item.id })"
          >
            {{ $t('buttons.edit') }}
          </v-btn>
        </v-card-text>
      </v-img>
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" small @click="replacement">{{ $t('sidebar.shop.replacement') }}</v-btn>
      <v-btn color="primary" small @click="showCreate">{{ $t('buttons.create_sale_short') }}</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';
import autoLink from 'autolink.js';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    ...mapActions({
      setEditModal: 'my/produce/setEditModal',
      setDetailModal: 'my/notproduce/setModal',
      setModal: 'my/produce/setModal',
      setReplacementModal: 'my/replacement/setModal',
    }),
    replacement() {
      this.setReplacementModal({ visible: true, product_id: this.item.id });
    },
    showCreate() {
      this.setModal({
        visible: true,
        product_id: this.item.id,
        cover_image_url: this.item.cover_image_url,
      });
    },
    showDetail() {
      const { title, description, contract_address, cover_image_url } = this.item;
      this.setDetailModal({
        visible: true,
        title,
        description: autoLink(description, { sharedAttr: { target: '_blank' } }),
        contract_address,
        cover_image_url,
      });
    },
  },
};
</script>
