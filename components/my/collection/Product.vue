<template>
  <v-card class="product-items">
    <Label :text="$t('product.status.created')" />
    <div class="d-flex flex-no-wrap justify-space-between product-img">
      <v-img
        :src="item.cover_image_url"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
        @click.prevent="showDetail"
      >
        <v-card-title class="pb-1 text-body-2" v-text="item.title"></v-card-title>        
        <v-btn
          dark
          outlined
          x-small
          @click.stop.prevent="() => setEditModal({ visible: true, description: item.description, id: item.id })"
          class="product-edit"
        >
          {{ $t('buttons.edit') }}
        </v-btn>       
      </v-img>
    </div>
    <section class="product-btn-group">
      <v-btn small block @click="replacement" class="btn-white-radius-medium mt-4">{{ $t('sidebar.shop.replacement') }}</v-btn>
      <v-btn small block @click="showCreate" class="btn-green-radius-medium mt-2">{{ $t('buttons.create_sale_short') }}</v-btn>
    </section>
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

<style scoped>
.product-items{
  box-shadow: 0 0 0 rgba(0,0,0,0) !important;
}
.product-img{
  position: relative;
  z-index: 0;
  border-radius: 16px;
  overflow: hidden;
}
.product-edit{
  position: absolute;
  right: 10px;
  bottom: 5px;
  z-index: 0;
}
</style>
