<template>
    <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
      <v-card>
        <v-img :src="image" />
        <v-card-text class="pa-4">
          <ListItem v-for="(x, i) in list" :left="x.label" :right="x.value" :key="i" />
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
    props: {
      visible: {
        type: Boolean,
        default: false,
      },
      item: {
        type: Object,
      },
      hide: {
        type: Function,
        default: () => {},
      },
    },
    computed: {
      image() {
        return this.item?.product?.cover_image_url;
      },
      list() {
        return [
          {
            label: this.$t('my.order.labels.product_id'),
            value: this.item?.product?.id,
          },
          {
            label: this.$t('my.order.labels.order_id'),
            value: this.item?.id,
          },
          {
            label: this.$t('my.order.labels.pay_method'),
            value:
              this.item?.pay_method === 'bank'
                ? this.$t('my.order.labels.pay_method_bank')
                : this.$t('my.order.labels.pay_method_credit_card'),
          },
          {
            label: this.$t('my.order.labels.buy_created_at'),
            value: this.item?.created_at ? new Date(this.item.created_at).toLocaleString() : '',
          },
          {
            label: this.$t('my.order.labels.auction_amount'),
            value: (this.item?.amount ? this.item.amount.toLocaleString() : '') + this.$t('my.order.append.amount_unit'),
          },
        ];
      },
    },
    methods: {
      closeModal() {
        this.$emit('hide');
      },
    },
  };
  </script>
  <style scoped></style>