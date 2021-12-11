<template>
  <v-card>
    <Label :text="$t('product.labels.sold')" />
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
};
</script>
