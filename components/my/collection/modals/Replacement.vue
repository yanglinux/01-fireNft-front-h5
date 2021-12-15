<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition"  width="80vw" persistent >
    <v-form ref="form" v-model="valid">
      <v-radio-group v-model="type">
        <v-card>
          <v-card-title>
            <v-radio :label="$t('titles.destination')" :value="0"></v-radio>
          </v-card-title>
          <v-card-text class="pt-2">
            <ListItem v-for="item in list" :key="item" :left="$t(`my.profile.${item}`)" :right="profile[item]" />
          </v-card-text>

          <v-divider />

          <v-card-title>
            <v-radio :label="$t('titles.other_destination')" :value="1"></v-radio>
          </v-card-title>
          <v-card-text class="pt-2">
            <v-text-field :rules="rule" hide-details v-model="form.name" :label="$t('titles.name')"></v-text-field>
            <v-text-field
              :rules="rule"
              hide-details
              v-model="form.zip_code"
              :label="$t('titles.zip_code')"
            ></v-text-field>
            <v-text-field
              :rules="rule"
              hide-details
              v-model="form.address"
              :label="$t('titles.address')"
            ></v-text-field>
            <v-text-field :rules="rule" hide-details v-model="form.tel" :label="$t('titles.phone')"></v-text-field>
          </v-card-text>
          <v-card-actions class="dialog-cancle-foot justify-center">
            <v-btn class="btn-gray-radius-large" @click="close">{{ $t('buttons.cancel') }}</v-btn>
            <v-btn :disabled="disabled" class="btn-green-radius-large" @click.prevent.stop="onOk">OK</v-btn>
          </v-card-actions>
        </v-card>
      </v-radio-group>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      list: ['zip_code', 'address', 'tel', 'name'],
      type: 0,
      form: {
        name: '',
        zip_code: '',
        address: '',
        tel: '',
      },
      rule: [(v) => !!v],
      valid: false,
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (this.error) {
          this.toast({ text: this.$t('errors.common'), type: 'error' });
        } else {
          this.getReplacementItems();
          this.getItems();
          this.close();
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.replacement.add.onFetch,
      profile: (state) => state.api.my.profile.data,
      error: (state) => state.api.my.replacement.add.error,
      modal: (state) => state.my.replacement.modal,
      visible: (state) => state.my.replacement.modal.visible,
      product_id: (state) => state.my.replacement.modal.product_id,
    }),
    disabled() {
      let res = false;
      if (this.type === 0) res = false;
      else if (this.type === 1 && this.valid === false) res = true;
      return res;
    },
  },
  methods: {
    ...mapActions({
      toast: 'toast/add',
      getProfile: 'api/my/profile/request',
      setModal: 'my/replacement/setModal',
      getReplacementItems: 'api/my/replacement/list/request',
      getItems: 'api/my/not_sales/request',
      setReplacement: 'api/my/replacement/add/request',
    }),
    getFormData() {
      let data = {};
      if (this.type === 0) {
        this.list.forEach((key) => (data[key] = this.profile[key]));
      } else {
        data = { ...this.form };
      }
      data['product_id'] = this.product_id;

      return data;
    },
    close() {
      this.$refs.form.reset();
      this.setModal({ visible: false, product_id: null });
    },
    onOk() {
      this.setReplacement(this.getFormData());
    },
  },
};
</script>
