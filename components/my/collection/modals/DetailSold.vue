<template>
  <v-dialog :value="!!item" transition="dialog-bottom-transition" persistent width="80vw">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="pt-2">
        <v-img :src="image" />
        <div class="text-subtitle-1">{{ $t('product.detail.titles.detail') }}</div>
        <v-divider />
        <div class="mt-2 mb-2" style="min-height: 80px" v-html="autoLink(description || '')"></div>
        <ListItem :left="$t('my.order.labels.product_id')" :right="id" />
        <ListItem :left="$t('my.order.labels.order_id')" :right="orderId" />
        <ListItem :left="$t('my.order.labels.pay_method')" :right="payMethod" />
        <ListItem :left="$t('titles.completed_at')" :right="completedAt" />
        <ListItem :left="$t('my.order.labels.amount')" :right="amount" />
        <v-divider class="mb-2" />
        <ContactDetail :address="contractAddress" />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="btn-gray-radius-large" @click="onHide">
          {{ $t('buttons.close') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import autoLink from 'autolink.js';

export default {
  props: {
    item: {
      type: Object,
    },
    hide: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    title() {
      return this.item?.product?.title;
    },
    description() {
      return this.item?.product?.description;
    },
    contractAddress() {
      return this.item?.contract_address;
    },
    image() {
      return this.item?.product?.cover_image_url;
    },
    id() {
      return this.item?.product?.id;
    },
    orderId() {
      return this.item?.id;
    },
    payMethod() {
      let res = '';
      if (this.item?.pay_method) {
        res =
          this.item.pay_method === 'bank'
            ? this.$t('my.order.labels.pay_method_bank')
            : this.$t('my.order.labels.pay_method_credit_card');
      }

      return res;
    },
    completedAt() {
      return this.item?.completed_at ? new Date(this.item.completed_at).toLocaleString() : '';
    },
    amount() {
      let res = '';
      if (this.item?.amount) {
        res = this.item.amount.toLocaleString() + this.$t('append.amount_unit');
      }
      return res;
    },
  },
  methods: {
    autoLink,
    onHide() {
      this.$emit('hide');
    },
  },
};
</script>
