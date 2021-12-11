<template>
  <v-card>
    <Label :text="label" />
    <div class="d-flex flex-no-wrap justify-space-between">
      <v-img
        :src="item.cover_image_url"
        class="white--text align-end"
        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
        height="200px"
      >
        <v-card-title class="pb-1 text-body-2" v-text="item.title"></v-card-title>
      </v-img>
    </div>
    <v-card-actions>
      <v-spacer />
      <v-btn color="primary" small @click="open">{{ $t('buttons.cancel_sale') }}</v-btn>
    </v-card-actions>
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
