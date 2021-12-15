<template>
  <div class="mt-4">
    <v-card>
      <v-card-text class="pa-0">
        <v-list-item v-for="item in items1" :key="item.id">
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
  data(){
    return{
      items1:[{
        product: {id: 98, title: "spaceman001",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/cover_%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
favorites_count: 2,
id: 98,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
title: "spaceman001",
},
      brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x29fa14d956c9737c8c1f0cdc29f1b1c9e2293af0",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/cover_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
created_at: "2021-12-05T16:24:07+09:00",
description: "抽象油画4新",
exhibit: {id: 163, status: "bidded", price_type: "fixed_price", fixed_price: 10000, start_price: null},
favorited: false,
favorites_count: 1,
id: 109,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/main_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
owner: {id: 10, owner_type: "User", name: "76884a06", image_url: null},
status: "listing",
status_change_reason: null,
title: "抽象油画4",
total: 1,
view_count: 13,
      },{
        product: {id: 98, title: "spaceman001",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/cover_%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
favorites_count: 2,
id: 98,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/c72b3ddb2c926167583b7e2680941717cdfb0b54b8137c05cf0fe868368dd4b3/%E5%8D%83%E5%BA%93%E7%BD%91_%E6%B2%BB%E6%84%88%E7%B3%BB%E5%AE%87%E8%88%AA%E5%91%98%E4%B8%8E%E9%A3%9E%E9%B1%BC%E6%98%9F%E9%99%85_%E6%8F%92%E7%94%BB%E7%BC%96%E5%8F%B724153.jpg",
title: "spaceman001",
},
      brand: "w",
category: {id: 1, name: "画像"},
contract_address: "0x29fa14d956c9737c8c1f0cdc29f1b1c9e2293af0",
cover_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/cover_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
created_at: "2021-12-05T16:24:07+09:00",
description: "抽象油画4新",
exhibit: {id: 163, status: "bidded", price_type: "fixed_price", fixed_price: 10000, start_price: null},
favorited: false,
favorites_count: 1,
id: 109,
main_image_url: "https://stg-fire-hot-storage.s3.amazonaws.com/uploads/product/590175d7a32b781034285dbe89ad42f6458298ab7ad470e9171035e4f95c2e36/main_%E6%B9%BF%E7%9A%84%E6%B2%B9%E6%BC%86%E7%9A%84%E6%8A%BD%E8%B1%A1%E8%89%BA%E6%9C%AF.jpg",
owner: {id: 10, owner_type: "User", name: "76884a06", image_url: null},
status: "listing",
status_change_reason: null,
title: "抽象油画4",
total: 1,
view_count: 13,
      }]
    }
  },
};
</script>
