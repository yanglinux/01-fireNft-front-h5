<template>
  <div>
    <div class="text-h6 pa-3">{{ $t('my.affiliate.title') }}</div> 

    <v-card class="my-profile-box">
      <v-card-text>
        <div class="text-body-1">{{ $t('my.affiliate.qr_code') }}</div>
        <v-img v-if="QRURL" :src="QRURL" />
        <div class="text-body-2 d-flex align-center justify-center">{{ $t('my.affiliate.qr_code_explain') }}</div>
      </v-card-text>
    </v-card>
    
    <v-card class="my-profile-box mt-2">
      <v-card-text>
        <div class="text-body-1">{{ $t('my.affiliate.share_url') }}</div>
        <div class="d-flex justify-center align-center">
          <v-text-field :value="shareURL" readonly ref="input">
            <template v-slot:append-outer>
              <v-btn outlined small @click="onCopy">
                <v-icon small>mdi-content-copy</v-icon>
                {{ $t('my.affiliate.copy') }}
              </v-btn>
            </template>
          </v-text-field>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="my-profile-box mt-2">
      <v-card-text>
        <div class="text-body-1">{{ $t('my.affiliate.history') }}</div>
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
          <template #item.created_at="row">
            {{ formatDate(row.item.created_at) }}
          </template>
        </v-data-table>
        <v-pagination
          circle
          :disabled="loading"
          @input="updatePage"
          :value="paging.current_page || 1"
          :length="Math.ceil(paging.total_count / paging.per_page) || 1"
        ></v-pagination>
      </v-card-text>
    </v-card>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import QRCode from 'qrcode';
import moment from 'moment';

export default {
  data() {
    return {
      QRURL: null,
      headers: [
        { value: 'created_at', text: this.$t('my.affiliate.fields.created_at') },
        { value: 'uuid', text: this.$t('my.affiliate.fields.uuid') },
      ],
    };
  },
  watch: {
    ['data.affiliate_code']: {
      handler: function (next) {
        if (next) {
          this.QRURL = null;
          QRCode.toDataURL(next, (err, url) => {
            if (!err) {
              this.QRURL = url;
            }
          });
        }
      },
      deep: true,
    },
  },
  computed: {
    ...mapState({
      data: (state) => state.api.my.affiliate.data,
      items: (state) => state.api.my.affiliate.data?.invited_users?.result || [],
      paging: (state) => state.api.my.affiliate.data?.invited_users?.paging || {},
      loading: (state) => state.api.my.affiliate.onFetch,
      paging: (state) => state.api.my.affiliate.data.paging || {},
    }),
    shareURL() {
      const { protocol, host } = window.location;
      return `${protocol}//${host}/signup?c=${this.data.affiliate_code || ''}`;
    },
  },
  created() {
    this.request();
  },
  methods: {
    ...mapActions({
      request: 'api/my/affiliate/request',
      toast: 'toast/add',
    }),
    redictDetail(id) {
      this.$router.push('/products/' + id);
    },
    updatePage(page) {
      this.request({ page });
    },
    onCopy() {
      const input = this.$refs.input.$el.querySelector('input:not([type=hidden])');
      input.focus();
      input.select();
      const r = document.execCommand('copy');
      if (r) {
        this.toast({ text: 'copied!', type: 'success' });
      } else {
        this.toast({ text: 'copy error!', type: 'error' });
      }
    },
    formatDate(date) {
      return moment.utc(date * 1000).format('YYYY/MM/DD HH:mm:ss');
    },
  },
};
</script>

<style scoped>
@import '@/assets/css/pages/my.scss';
</style>
