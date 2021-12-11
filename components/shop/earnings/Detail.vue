<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-img :src="image" />
      <v-card-text class="pa-4">
        <ListItem v-for="item in items" :left="item[0]" :right="item[1]" :key="item[0]" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <template v-if="notTransferred">
          <v-btn color="primary" @click="closeModal">{{ $t('buttons.ok') }}</v-btn>
        </template>
        <template v-else>
          <v-btn text @click="closeModal">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn color="primary" @click="pay">{{ $t('buttons.order_confirm') }}</v-btn>
        </template>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  watch: {
    paidLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.paidError) {
          this.toast({ text: this.$t('errors.common'), type: 'error' });
        } else {
          this.toast({ text: this.$t('titles.payment_success'), type: 'success' });
          this.getItems();
          this.closeModal();
        }
      }
    },
  },
  computed: {
    ...mapState({
      visible: (state) => state.shop.earnings.modal.visible,
      data: (state) => state.shop.earnings.modal.data || {},
      paidError: (state) => state.api.shop.earnings.paid.error,
    }),
    items() {
      const { id, pay_method, completed_at = '-', amount } = this.data;
      return [
        [this.$t('titles.order_no'), id],
        [this.$t('titles.type'), this.$t(`orders.methods.${pay_method}`)],
        [this.$t('titles.payment_amount'), amount],
        [
          this.$t('titles.completed_at'),
          completed_at !== '-' ? moment(completed_at).format('YYYY/MM/DD HH:mm:ss') : completed_at,
        ],
      ];
    },
    image() {
      return this.data.product?.cover_image_url;
    },
    notTransferred() {
      return this.data.status !== 'transferred';
    },
  },
  methods: {
    ...mapActions({
      setModal: 'shop/earnings/setModal',
      getItems: 'api/shop/earnings/list/request',
      toast: 'toast/add',
    }),
    closeModal() {
      this.setModal({ visible: false, data: {} });
    },
    pay() {
      this.paid({ id: this.data.id });
    },
  },
};
</script>

<style scoped></style>
