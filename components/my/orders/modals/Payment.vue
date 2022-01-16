<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-card>
      <v-img :src="image" />
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text class="pa-4">
        <p class="red--text">{{ $t('my.order.labels.payment_due_at') }}{{ paymentDueAt }}</p>
        <ListItem v-for="(x, i) in list" :left="x.label" :right="x.value" :key="i" :className="x.className" />
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <template v-if="okonly">
          <v-btn color="primary" @click="closeModal">{{ $t('buttons.ok') }}</v-btn>
        </template>
        <template v-else>
          <v-btn color="primary" text @click="closeModal">{{ $t('buttons.later_transfer') }}</v-btn>
          <v-btn color="primary" @click="onOk">{{ $t('buttons.transferred') }}</v-btn>
        </template>
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
    ok: {
      type: Function,
      default: () => {},
    },
    okonly: {
      type: Boolean,
    },
  },
  computed: {
    image() {
      return this.item?.product?.cover_image_url;
    },
    title() {
      return this.item?.product?.title;
    },
    paymentDueAt() {
      return this.item?.payment_due_at ? new Date(this.item.payment_due_at).toLocaleString() : '';
    },
    list() {
      return [
        {
          label: this.$t('my.order.labels.order_id'),
          value: this.item?.id,
        },
        {
          label: this.$t('my.order.labels.bank'),
          value: this.item?.payment_to?.bank,
        },
        {
          label: this.$t('my.order.labels.branch'),
          value: this.item?.payment_to?.branch,
        },
        {
          label: this.$t('my.order.labels.account_type'),
          value:
            this.item?.payment_to?.account_type === 'normal'
              ? this.$t('my.order.labels.account_type_normal')
              : this.$t('my.order.labels.account_type_checking'),
        },
        {
          label: this.$t('my.order.labels.account'),
          value: this.item?.payment_to?.account,
        },
        {
          label: this.$t('my.order.labels.name'),
          value: this.item?.payment_to?.name,
        },
        {
          label: this.$t('my.order.labels.name_kana'),
          value: this.item?.payment_to?.name_kana,
        },
        {
          label: this.$t('my.order.labels.amount'),
          value: (this.item?.amount ? this.item.amount.toLocaleString() : '') + this.$t('my.order.append.amount_unit'),
          className: 'text-h6',
        },
      ];
    },
  },
  methods: {
    closeModal() {
      this.$emit('hide');
    },
    onOk() {
      this.$emit('ok');
    },
  },
};
</script>

<style scoped></style>
