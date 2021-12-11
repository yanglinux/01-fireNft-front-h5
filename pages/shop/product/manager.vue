<template>
  <div>
    <ShopProductSearch />
    <v-card class="mt-2">
      <v-card-text>
        <v-btn color="primary" @click="showAddModal">{{ $t('buttons.regist_product') }}</v-btn>
      </v-card-text>
    </v-card>
    <v-data-table
      disable-sort
      fixed-header
      hide-default-footer
      mobile-breakpoint="0"
      :loading="loading"
      :headers="headers"
      :items="items"
      :items-per-page="25"
      class="elevation-1 custom mt-2"
    >
      <template #no-data>
        {{ $t('titles.no_data') }}
      </template>
      <template #item.status="row">
        <span :class="row.item.status">{{ $t(`product.nft.status.${row.item.status}`) }}</span>
      </template>
      <template #item.cover_image_url="row">
        <img :src="row.item.cover_image_url" class="ma-2" />
      </template>
      <template #item.actions="row">
        <v-btn class="ma-2" color="primary" @click="createNFTModal = row.item" v-if="buttonNFTCreateVisiable(row)">
          {{ $t('buttons.create_nft_request') }}
        </v-btn>
        <v-btn class="ma-2" color="primary" @click="cancelNFTModal = row.item" v-if="buttonNFTCancelVisiable(row)">
          {{ $t('buttons.request_cancel') }}
        </v-btn>
        <v-btn class="ma-2" color="primary" @click="confirmNFT(row)" v-if="buttonNFTConfirmVisiable(row)">
          {{ $t('buttons.confirm_contract') }}
        </v-btn>
        <v-btn
          class="ma-2"
          color="primary"
          v-if="row.item.status_change_reason && row.item.status === 'remanded'"
          @click="setRemandedModal({ visible: true, text: row.item.status_change_reason })"
        >
          {{ $t('buttons.remanded_reason') }}
        </v-btn>
        <v-btn
          class="ma-2"
          color="primary"
          v-if="buttonEditVisiable(row)"
          @click="setModalEdit({ id: row.item.id, visible: true })"
        >
          {{ $t('buttons.edit') }}
        </v-btn>
      </template>
    </v-data-table>
    <v-pagination
      :disabled="loading"
      @input="updatePage"
      :value="paging.current_page"
      :length="Math.ceil(paging.total_count / paging.per_page) || 1"
    ></v-pagination>
    <ShopProductEdit />
    <ShopProductNFTCreate
      :visible="!!createNFTModal"
      @hide="createNFTModal = null"
      :id="createNFTModal ? createNFTModal.id : null"
    />
    <ShopProductNFTCancel
      :visible="!!cancelNFTModal"
      @hide="cancelNFTModal = null"
      :id="cancelNFTModal ? cancelNFTModal.id : null"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import moment from 'moment';

export default {
  layout: 'shop',
  data: () => ({
    cancelNFTModal: null,
    createNFTModal: null,
    remandedModal: {
      visible: false,
      text: '',
    },
  }),
  watch: {
    cancelLoading(next, prev) {
      if (next === false && prev === true) {
        if (this.cancelError) this.toast({ text: this.cancelMessage, type: 'error' });
        else {
          this.$refs.cancelModal.$refs.modal.hide('modal-prevent-closing');
          this.getItems();
        }
      }
    },
  },
  computed: {
    ...mapState({
      items: (state) => state.api.shop.product.items.data?.result || [],
      fields: (state) => state.shop.product.fields,
      paging: (state) => state.api.shop.product.items.data?.paging || {},
      loading: (state) => state.api.shop.product.items.onFetch,
    }),
    headers() {
      return [...this.fields].map(({ value, text }) => {
        return { value, text: text ? this.$t(`titles.${text}`) : '' };
      });
    },
    productItems() {
      let items = [];
      this.items.forEach((x) => {
        const created_at = moment(x.created_at).format('YYYY/MM/DD HH:mm:ss');
        const category_name = x.category.name;
        items.push({ ...x, created_at, category_name });
      });
      return items;
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.getItems();
    }
  },
  methods: {
    ...mapActions({
      request: 'api/shop/product/items/request',
      toast: 'toast/add',
      setModalEdit: 'shop/product/setModalEdit',
    }),
    getItems(option = {}) {
      this.request(option);
    },
    updatePage(page) {
      this.getItems({ page });
    },
    showAddModal() {
      this.setModalEdit({ id: null, visible: true });
    },
    toPageDetail(id) {
      this.$router.push(`/shop/product/detail/${id}`);
    },
    buttonNFTCreateVisiable({ item }) {
      /* return item.status === 'listing'; */
      return ['remanded', 'created'].includes(item.status);
    },
    buttonNFTCancelVisiable({ item }) {
      return item.status === 'requested';
    },
    buttonNFTConfirmVisiable({ item }) {
      return item.status === 'listing';
    },
    buttonEditVisiable({ item }) {
      const list = ['created', 'remanded'];
      return list.includes(item.status);
    },
    confirmNFT({ item }) {
      window.open(`${this.$config.explorerURL}${item.contract_address}`, '__blank');
    },
    setRemandedModal({ visible, text }) {
      this.remandedModal = { visible, text };
    },
  },
};
</script>
