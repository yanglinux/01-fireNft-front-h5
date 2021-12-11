<template>
  <v-card elevation="2">
    <form @submit.prevent="onSubmit">
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" md="4">
              <v-text-field
                hide-details
                v-model="form['q[title_cont]']"
                :label="$t('titles.product_name')"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="4">
              <v-text-field hide-details v-model="form['q[id_eq]']" :label="$t('titles.product_code')"></v-text-field>
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
    form: {
      'q[title_cont]': '',
      'q[id_eq]': '',
    },
  }),
  computed: {
    ...mapState({
      loading: (state) => state.api.shop.sales.items.onFetch,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/shop/sales/items/request',
    }),
    onSubmit() {
      this.request(this.form);
    },
  },
};
</script>
