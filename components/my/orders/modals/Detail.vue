<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-img :src="image" class="white--text align-end"></v-img>
      <v-card-title>
        {{ title }}
      </v-card-title>
      <v-card-text class="pa-4">
        <template v-for="(x, i) in list">
          <ListItem v-if="!x.slot" :left="x.label" :right="x.value" :key="i" />
          <ListItem v-else :left="x.label" :key="i">
            <template #right>
              <NuxtLink :to="x.href">{{ x.value }}</NuxtLink>
            </template>
          </ListItem>
        </template>
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
    title() {
      return this.item?.product?.title;
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
          label: this.$t('my.order.labels.buy_name'),
          value: this.item?.buyer?.name,
          href: (this.item?.buyer?.buyer_type === 'User' ? '/users/' : '/shops') + this.item?.buyer?.name,
          slot: true,
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
          label: ['paid', 'transferred'].includes(this.item?.status)
            ? this.$t('titles.payment_amount')
            : this.$t('my.order.labels.amount'),
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
