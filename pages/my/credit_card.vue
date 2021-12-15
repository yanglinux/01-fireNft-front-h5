<template>
  <div v-if="loaded">   
    <Banner />  
    <Register v-if="!mycard.persisted" />
    <v-card class="my-profile-box" v-else>
      <v-card-text>
        <div class="subtitle-2">{{ $t('my.credit_card.created') }}</div>
        <v-divider />
        <div class="mt-2">{{ $t('my.credit_card.card_number') }} **** **** **** {{ mycard.last4 }}</div>
        <v-btn class="mt-4" @click="modal = true" block>{{ $t('buttons.unregister') }}</v-btn>

        <v-dialog :value="modal" transition="dialog-bottom-transition" persistent>
          <v-card>
            <v-card-text class="pa-4">
              {{ $t('message.info_credit_card_unregister') }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="modal = false" class="btn-gray-radius-large">{{ $t('buttons.cancel') }}</v-btn>
              <v-btn :loading="deleteLoading" @click="deleteCreditCard" class="btn-green-radius-large">
                {{ $t('buttons.confirm') }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Register from '@/components/my/credit_card/Register.vue';
import Banner from '@/layouts/my/Banner';

export default {
  components: { Register,Banner },
  data() {
    return {
      modal: false,
    };
  },
  watch: {
    deleteLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.deleteError) {
          this.getMyCreditCard();
          this.modal = false;
        } else this.toast({ text: this.$t('message.error_delete_credit_card_failure'), type: 'error' });
      }
    },
  },
  created() {
    this.getMyCreditCard();
  },
  computed: {
    ...mapState({
      loaded: (state) => state.api.my.credit_card.loaded,
      mycard: (state) => state.api.my.credit_card.data,
      deleteLoading: (state) => state.api.my.credit_card_delete.onFetch,
      deleteError: (state) => state.api.my.credit_card_delete.error,
    }),
  },
  methods: {
    ...mapActions({
      getMyCreditCard: 'api/my/credit_card/request',
      requestDeleteCreditCard: 'api/my/credit_card_delete/request',
      toast: 'toast/add',
    }),
    deleteCreditCard() {
      this.requestDeleteCreditCard();
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/my.scss';
.card-field {
  height: 30px;
  border-bottom: 1px solid gray;
}
</style>
