<template>
  <v-card class="product-items">
    <Label :text="label" />
    <div class="d-flex flex-no-wrap justify-space-between product-img">
      <v-img
        :src="item.cover_image_url"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title class="pb-1 text-body-2" v-text="item.title"></v-card-title>
      </v-img>
    </div>
    <section class="product-btn-group">
      <v-btn small block @click="open" class="btn-white-radius-medium mt-4">{{ $t('buttons.cancel_sale') }}</v-btn>
    </section>
  </v-card>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    label() {
      return this.item.exhibit.price_type === 'fixed_price'
        ? this.$t('titles.on_listing')
        : this.$t('my.order.bidding.status.listing');
    },
  },
  methods: {
    ...mapActions({
      setModal: 'my/produce/setSaleModal',
    }),
    open() {
      this.setModal({ visible: true, id: this.item.exhibit.id });
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
