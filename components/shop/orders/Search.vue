<template>
  <v-card elevation="2">
    <form @submit.prevent="onSubmit">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="form['q[created_at_on_month]']"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    hide-details
                    v-model="form['q[created_at_on_month]']"
                    :label="$t('shop.labels.paydate-search')"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="form['q[created_at_on_month]']" type="month" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text @click="menu = false">{{ $t('buttons.cancel') }}</v-btn>
                  <v-btn color="primary" @click="$refs.menu.save(form['q[created_at_on_month]'])">
                    {{ $t('buttons.ok') }}
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                hide-details
                v-model="form['q[target_of_Product_type_title_cont]']"
                :label="$t('titles.product_name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field
                hide-details
                v-model="form['q[target_of_Product_type_id_eq]']"
                :label="$t('titles.product_code')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <div class="text-subtitle-2">{{ $t('titles.payment_status') }}</div>
              <v-chip-group v-model="form['q[status_eq_any]']" column active-class="primary--text">
                <v-chip :value="option.value" v-for="(option, index) in options" :key="index" class="ml-2">
                  {{ option.text }}
                </v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-list-item class="grow">
          <v-row align="center" justify="end">
            <v-btn color="primary" :loading="loading" type="submit">
              {{ $t('buttons.search') }}
            </v-btn>
          </v-row>
        </v-list-item>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  data: () => ({
    menu: null,
    form: {
      'q[target_of_Product_type_title_cont]': '',
      'q[target_of_Product_type_id_eq]': '',
      'q[created_at_on_month]': '',
      'q[status_eq_any]': null,
    },
  }),
  computed: {
    ...mapState({
      loading: (state) => state.api.shop.sales.items.onFetch,
    }),
    options() {
      return [
        { text: this.$t('titles.all'), value: 'all' },
        { text: this.$t('orders.status.waiting_payment'), value: ['waiting_confirm', 'waiting_payment'] },
        { text: this.$t('orders.status.transferred'), value: 'transferred' },
        { text: this.$t('orders.status.paid'), value: 'paid' },
        { text: this.$t('orders.status.cancel'), value: 'cancel' },
      ];
    },
  },
  methods: {
    ...mapActions({
      request: 'api/shop/orders/list/request',
    }),
    onSubmit() {
      const form = { ...this.form };
      if (form['q[status_eq_any]'] === 'all') form['q[status_eq_any]'] = '';
      if (form['q[created_at_on_month]']) form['q[created_at_on_month]'] += '-01';
      this.request(form);
    },
  },
};
</script>
