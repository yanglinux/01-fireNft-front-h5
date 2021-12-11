<template>
  <v-dialog :value="visible" transition="dialog-bottom-transition" persistent width="90vw">
    <v-form v-model="valid" ref="form">
      <v-card>
        <v-card-text class="pa-4">
          <v-text-field
            :rules="[(v) => !!v]"
            hide-details
            v-model="form.deliver_company"
            :label="$t('titles.sent_company')"
          ></v-text-field>
          <v-text-field
            :rules="[(v) => !!v]"
            hide-details
            v-model="form.deliver_no"
            :label="$t('titles.sent_no')"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="closeModal">
            {{ $t('buttons.cancel') }}
          </v-btn>
          <v-btn color="primary" :disabled="!valid" :loading="loading" @click="send">
            {{ $t('buttons.send') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  data() {
    return {
      valid: true,
      form: {
        deliver_company: '',
        deliver_no: '',
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (this.error) {
          this.toast({ text: this.$t('errors.common'), type: 'error' });
        } else {
          this.getDetail({ id: this.id });
          this.request();
          this.$refs.form.reset();
          this.closeModal();
        }
      }
    },
  },
  computed: {
    ...mapState({
      visible: (state) => state.shop.replacement.list.sendModal.visible,
      id: (state) => state.shop.replacement.list.sendModal.data?.id,
      loading: (state) => state.api.shop.replacement.sent.onFetch,
      error: (state) => state.api.shop.replacement.sent.error,
    }),
  },
  methods: {
    ...mapActions({
      setModal: 'shop/replacement/list/setSendModal',
      request: 'api/shop/replacement/list/request',
      getDetail: 'api/shop/replacement/detail/request',
      deliver: 'api/shop/replacement/sent/request',
      toast: 'toast/add',
    }),
    closeModal() {
      this.setModal({ visible: false, data: {} });
    },
    send() {
      this.deliver({
        ...this.form,
        id: this.id,
      });
    },
  },
};
</script>

<style scoped></style>
