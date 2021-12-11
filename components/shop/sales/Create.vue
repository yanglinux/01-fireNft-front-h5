<template>
  <v-dialog :value="modal.visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-form v-model="valid">
      <v-card>
        <v-card-text>
          <v-select
            :rules="[(v) => !!v]"
            v-model="form.price_type"
            :items="typeItems"
            :label="$t('titles.product_type')"
          ></v-select>
          <template v-if="form.price_type === 'fixed_price'">
            <v-text-field
              :rules="[(v) => !!v]"
              v-model="form.fixed_price"
              :label="$t('titles.fixed_price')"
            ></v-text-field>
          </template>
          <template v-else>
            <v-text-field
              :rules="[(v) => !!v]"
              v-model="form.start_price"
              :label="$t('titles.start_price')"
            ></v-text-field>
            <v-text-field
              :rules="[(v) => !!v]"
              v-model="form.bid_unit"
              :label="$t('product.detail.labels.bid_unit')"
            ></v-text-field>
            <v-select
              :rules="[(v) => !!v]"
              v-model="form.bid_days"
              :items="selectOptions"
              :label="$t('product.detail.labels.bid_days')"
            ></v-select>
          </template>
        </v-card-text>

        <div style="height: 50px">
          <div class="text-body-2 pa-4" v-show="showFee">
            {{ $t('titles.fee') }} {{ fee }} {{ $t('append.amount_unit') }}
          </div>
        </div>

        <v-card-actions>
          <v-spacer />
          <v-btn :disabled="loading" text @click="setModalCreate({ visible: false, data: {} })">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn :disabled="!valid" :loading="loading" color="primary" @click="create">{{ $t('buttons.ok') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
  watch: {
    ['form.price_type'](type) {
      if (type === 'auction') this.form.fixed_price = null;
      else this.form.start_price = null;
    },
    ['form.start_price'](amount) {
      if (amount) this.getFee({ amount });
    },
    ['form.fixed_price'](amount) {
      if (amount) this.getFee({ amount });
    },
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.createError) {
          this.setModalCreate({ visible: false, data: {} });
          this.getItems();
        } else {
          this.toast({
            text: [this.$t('errors.common'), ...this.createData.errors].join('<br />'),
            type: 'error',
          });
        }
      }
    },
  },
  data: function () {
    return {
      num: 1,
      valid: true,
      form: {
        price_type: 'fixed_price',
        start_price: null,
        fixed_price: null,
        bid_unit: null,
        bid_days: null,
      },
      typeItems: [
        { value: 'fixed_price', text: this.$t('product.type.fixed_price') },
        { value: 'auction', text: this.$t('product.type.auction') },
      ],
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.shop.sales.create.onFetch,
      fee: (state) => state.api.shop.fee.data?.fee,
      modal: (state) => state.shop.sales.modalCreate,
      createError: (state) => state.api.shop.sales.create.error,
      createData: (state) => state.api.shop.sales.create.data,
    }),
    showFee() {
      const { start_price, fixed_price, price_type } = this.form;
      const showStartPrice = price_type === 'auction' && start_price && this.fee;
      const showFixedPrice = price_type === 'fixed_price' && fixed_price && this.fee;
      return showStartPrice || showFixedPrice;
    },
    selectOptions() {
      let items = [];
      for (let i = 1; i <= 7; i++) items.push({ text: `${i}${this.$t('titles.day')}`, value: i });
      return items;
    },
  },
  methods: {
    ...mapActions({
      getItems: 'api/shop/sales/items/request',
      getFee: 'api/shop/fee/request',
      setModalCreate: 'shop/sales/setModalCreate',
      requestCreateSale: 'api/shop/sales/create/request',
      toast: 'toast/add',
    }),
    create() {
      this.requestCreateSale({
        ...this.form,
        product_id: this.modal.data.id,
      });
    },
  },
};
</script>
