<template>
  <v-dialog fullscreen :value="modal.visible" transition="dialog-bottom-transition" persistent>
    <v-card>
      <v-toolbar class="cp-head">
        <v-btn icon dark @click="onHide">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :disabled="step !== 3" :loading="loading" dark text @click="onSave">
            {{ $t('buttons.create_sale') }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="pa-0" style="min-height: 50vh">
        <div>
          <v-stepper non-linear v-model="step">
            <v-stepper-header>
              <template v-for="(step, index) in steps">
                <v-stepper-step :step="index + 1" :key="step.title">
                  {{ $t(`titles.${step.title}`) }}
                </v-stepper-step>
                <v-divider />
              </template>
            </v-stepper-header>
            <v-stepper-items>
              <v-stepper-content :step="1">
                <div class="text-subtitle-2">{{ $t('titles.product_type_setting') }}</div>
                <v-divider class="mt-2 mb-4" />

                <v-slide-group v-model="form.price_type" mandatory>
                  <v-slide-item v-slot="{ active, toggle }" value="auction">
                    <v-btn
                      class="btn-white-radius-medium mx-2"
                      rounded
                      depressed
                      active-class="btn-green-radius-medium white--text"
                      :input-value="active"
                      @click="toggle"
                    >
                      {{ $t('product.type.auction') }}{{ $t('buttons.create_sale_short') }}
                    </v-btn>
                  </v-slide-item>
                  <v-slide-item v-slot="{ active, toggle }" value="fixed_price">
                    <v-btn
                      class="btn-white-radius-medium mx-2"
                      rounded
                      depressed
                      active-class="btn-green-radius-medium white--text"
                      :input-value="active"
                      @click="toggle"
                    >
                      {{ $t('product.type.fixed_price') }}{{ $t('buttons.create_sale_short') }}
                    </v-btn>
                  </v-slide-item>
                </v-slide-group>
              </v-stepper-content>
              <v-stepper-content :step="2">
                <div class="text-subtitle-2">{{ $t('titles.detail_setting') }}</div>
                <v-divider class="mt-2 mb-4" />

                <v-form ref="form" v-model="valid" lazy-validation>
                  <div v-if="form.price_type === 'auction'">
                    <div class="mt-2">
                      <v-text-field
                        hide-details
                        :rules="rules.start_price"
                        v-model="form.start_price"
                        :label="$t('product.detail.labels.start_price')"
                      ></v-text-field>
                    </div>
                    <div class="mt-2">
                      <v-text-field
                        hide-details
                        :rules="rules.bid_unit"
                        v-model="form.bid_unit"
                        :label="$t('product.detail.labels.bid_unit')"
                      ></v-text-field>
                    </div>
                    <div class="mt-2">
                      <v-select
                        hide-details
                        v-model="form.bid_days"
                        :rules="rules.bid_days"
                        :items="selectOptions"
                        :label="$t('product.detail.labels.bid_days')"
                      ></v-select>
                    </div>
                  </div>
                  <div v-else>
                    <v-text-field
                      hide-details
                      :rules="rules.fixed_price"
                      v-model="form.fixed_price"
                      :label="$t('product.detail.labels.price')"
                    ></v-text-field>
                  </div>
                  <v-divider class="mb-4" />
                  <div v-if="showFee">{{ $t('titles.fee') }} {{ fee }} {{ $t('append.amount_unit') }}</div>
                </v-form>
              </v-stepper-content>
              <v-stepper-content :step="3">
                <v-img :src="modal.cover_image_url" />
                <ListItem v-for="d in data" :key="d.title" :left="$t(`fields.${d.title}`)" :right="d.value" />
              </v-stepper-content>
            </v-stepper-items>
          </v-stepper>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-center mt-4">
        <v-btn :disabled="step === 1"  class="btn-green-radius-large" @click="prevStep">
          {{ $t('buttons.prev') }}
        </v-btn>
        <v-btn :disabled="nextDisable"  class="btn-green-radius-large" @click="onNext">
          {{ $t('buttons.next') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      step: 1,
      valid: true,
      form: {
        price_type: null,
        fixed_price: null,
        start_price: null,
        bid_unit: null,
        bid_days: null,
      },
      rules: {
        fixed_price: [(v) => !!v],
        start_price: [(v) => !!v],
        bid_unit: [(v) => !!v],
        bid_days: [(v) => !!v],
      },
    };
  },
  watch: {
    ['form.start_price'](amount) {
      if (amount) this.getFee({ amount });
    },
    ['form.fixed_price'](amount) {
      if (amount) this.getFee({ amount });
    },
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.onHide();
          this.getItems();
          this.getListingItems();
        } else {
          const messge = this.exhibitData.errors.join('<br />');
          this.toast({ text: messge, type: 'error' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      steps: (state) => state.my.produce.steps,
      fee: (state) => state.api.shop.fee.data?.fee,
      modal: (state) => state.my.produce.modal,
      loading: (state) => state.api.my.exhibit.onFetch,
      error: (state) => state.api.my.exhibit.error,
      exhibitData: (state) => state.api.my.exhibit.data,
    }),
    nextDisable() {
      return [this.step === this.steps.length, this.step === 2 && !this.valid].some((x) => x);
    },
    showFee() {
      const { start_price, fixed_price, price_type } = this.form;
      const showStartPrice = price_type === 'auction' && start_price && this.fee;
      const showFixedPrice = price_type === 'fixed_price' && fixed_price && this.fee;
      return showStartPrice || showFixedPrice || false;
    },
    selectOptions() {
      let items = [];
      for (let i = 1; i <= 7; i++) items.push({ text: `${i}${this.$t('titles.day')}`, value: i });
      return items;
    },
    data() {
      let data = [];
      const { price_type } = this.form;

      const titles = {
        auction: ['price_type', 'start_price', 'bid_unit', 'bid_days'],
        fixed_price: ['price_type', 'fixed_price'],
      };

      const i18n = {
        start_price: this.$t('append.amount_unit'),
        fixed_price: this.$t('append.amount_unit'),
        bid_unit: this.$t('append.amount_unit'),
        bid_days: this.$t('titles.day'),
      };

      const listKeys = titles[price_type] || [];

      listKeys.forEach((title) => {
        let append = '';
        if (i18n[title]) append = i18n[title];
        data.push({
          title,
          value: title === 'price_type' ? this.$t(`product.type.${price_type}`) : this.form[title] + append,
        });
      });

      data.push({
        title: 'fee',
        value: `${this.fee} ${this.$t('append.amount_unit')}`,
      });

      return data;
    },
  },
  methods: {
    ...mapActions({
      getFee: 'api/fee/request',
      setModal: 'my/produce/setModal',
      createItem: 'api/my/exhibit/request',
      getListingItems: 'api/my/listing/request',
      getItems: 'api/my/not_listed/request',
      toast: 'toast/add',
    }),
    prevStep() {
      this.step -= 1;
      if (this.step === 1) this.$refs.form.reset();
    },
    onHide() {
      this.setModal({
        visible: false,
        product_id: null,
        cover_image_url: '',
      });
    },
    onNext() {
      if (this.step === 2) {
        const valid = this.$refs.form.validate();
        if (valid) this.step += 1;
      } else this.step += 1;
    },
    onSave() {
      this.createItem({
        ...this.form,
        product_id: this.modal.product_id,
      });
    },
  },
};
</script>

<style scoped>
.cp-head{
  background: #0E7868 !important;
}
</style>
