<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-card-title>
        {{ $t('titles.destination') }}
      </v-card-title>
      <v-card-text class="pa-4">
        <ListItem v-for="item in customerDetail" :left="item[0]" :right="item[1]" :key="item[0]" />
      </v-card-text>
      <v-card-actions v-if="detail.status === 'requested'">
        <v-spacer />
        <v-btn color="primary" @click="openSendModal">
          {{ $t('buttons.send') }}
        </v-btn>
      </v-card-actions>
      <v-divider />
      <v-card-title>
        {{ $t('titles.destination') }}
      </v-card-title>
      <v-card-text class="pa-4">
        <v-img :src="product.cover_image_url" />
        <ListItem v-for="item in productDetail" :left="item[0]" :right="item[1]" :key="item[0]" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="primary" @click="closeModal">{{ $t('buttons.ok') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  watch: {
    id(next, prev) {
      if (next && !prev) {
        this.getDetail({ id: this.id });
      }
    },
  },
  computed: {
    ...mapState({
      visible: (state) => state.shop.replacement.list.modal.visible,
      id: (state) => state.shop.replacement.list.modal.data?.id,
      detail: (state) => state.api.shop.replacement.detail.data,
      product: (state) => state.api.shop.replacement.detail.data?.product || {},
    }),
    customerDetail() {
      const { name, tel, address, zip_code, status, updated_at } = this.detail;
      return [
        [this.$t('titles.send_status'), this.$t(`deliver.${status}`)],
        [this.$t('titles.replacement_updated_at'), moment(updated_at).format('YYYY-MM-DD HH:mm:ss')],
        [this.$t('titles.zip_code'), zip_code],
        [this.$t('titles.address'), address],
        [this.$t('titles.name'), name],
        [this.$t('titles.tel'), tel],
      ];
    },
    productDetail() {
      const { id, title, description } = this.product;
      return [
        [this.$t('titles.product_code'), id],
        [this.$t('titles.product_name'), title],
        [this.$t('titles.product_description'), description],
      ];
    },
  },
  methods: {
    ...mapActions({
      setModal: 'shop/replacement/list/setModal',
      setSendModal: 'shop/replacement/list/setSendModal',
      request: 'api/shop/replacement/list/request',
      getDetail: 'api/shop/replacement/detail/request',
      toast: 'toast/add',
    }),
    closeModal() {
      this.setModal({ visible: false, data: {} });
    },
    openSendModal() {
      this.setSendModal({ visible: true, data: { id: this.id } });
    },
  },
};
</script>

<style scoped></style>
