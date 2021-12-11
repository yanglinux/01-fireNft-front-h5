<template>
  <div class="mt-4">
    <v-card>
      <v-card-text class="pa-0">
        <v-list-item v-for="item in items" :key="item.id">
          <img :src="item.product.cover_image_url" width="50" />
          <v-list-item-content class="ml-2">
            <v-list-item-title v-text="item.product.title"></v-list-item-title>
            <v-list-item-subtitle>{{ item.zip_code }} {{ item.address }} {{ item.tel }}</v-list-item-subtitle>
            <v-list-item-subtitle>
              <ListItem v-if="item.deliver_company" :left="$t('titles.sent_company')" :right="item.deliver_company" />
              <ListItem v-if="item.deliver_no" :left="$t('titles.sent_no')" :right="item.deliver_no" />
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-list-item-subtitle v-text="$t(`deliver.${item.status}`)"></v-list-item-subtitle>
            <v-btn
              @click="() => setModal({ visible: true, id: item.id })"
              v-if="showConfirm(item.status)"
              color="primary"
              small
            >
              {{ $t('titles.receive_confirm') }}
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card-text>
    </v-card>

    <v-pagination
      circle
      :disabled="loading"
      @input="updatePage"
      :value="paging.current_page || 1"
      :length="Math.ceil(paging.total_count / paging.per_page) || 1"
    ></v-pagination>

    <v-dialog :value="modal.visible" transition="dialog-bottom-transition" persistent width="80vw">
      <v-card>
        <v-card-text class="pa-4">{{ $t('titles.receive_product') }}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="hideModal">{{ $t('buttons.cancel') }}</v-btn>
          <v-btn :loading="confirmLoading" color="primary" @click.prevent.stop="confirm">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: () => ({
    modal: {
      visible: false,
      id: null,
    },
  }),
  watch: {
    confirmLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.confirmError) {
          this.toast({ text: this.$t('errors.common'), type: 'error' });
        } else {
          this.getItems();
          this.hideModal();
        }
      }
    },
  },
  computed: {
    ...mapState({
      items: (state) => state.api.my.replacement.list.data?.result || [],
      loading: (state) => state.api.my.replacement.list.onFetch,
      paging: (state) => state.api.my.replacement.list.data?.paging || {},
      confirmLoading: (state) => state.api.my.replacement.delivered.onFetch,
      confirmError: (state) => state.api.my.replacement.delivered.error,
      confirmMessage: (state) => state.api.my.replacement.delivered.message,
    }),
  },
  created() {
    this.getItems();
  },
  methods: {
    ...mapActions({
      getItems: 'api/my/replacement/list/request',
      sentConfirm: 'api/my/replacement/delivered/request',
      toast: 'toast/add',
    }),
    updatePage(page) {
      this.getItems({ page });
    },
    showConfirm(status) {
      return ['sent'].includes(status);
    },
    setModal(data) {
      this.modal = data;
    },
    hideModal() {
      this.modal = { visible: false, id: null };
    },
    confirm() {
      this.sentConfirm({
        id: this.modal.id,
      });
    },
  },
};
</script>
