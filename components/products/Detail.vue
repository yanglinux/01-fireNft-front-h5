<template>
  <div>
    <v-img max-height="50vh" :src="item.cover_image_url" />
    <div class="mt-2">
      <div class="text--h4 d-flex justify-start">
        <div>{{ item.title }}</div>
        <div class="ml-auto">
          <Like :count="item.favorites_count" :value="favorite" @change="likeChanged" :id="item.id" />
        </div>
      </div>
      <div class="d-flex justify-start mt-2">
        <div>
          <v-avatar color="indigo">
            <span class="white--text text-body-2" v-if="!owner.image_url">{{ owner.name }}</span>
            <img v-else :src="owner.image_url" alt="owner.name" />
          </v-avatar>
        </div>
        <div class="ml-2">
          <div>
            <span class="blue-grey--text lighten-3 text-caption">{{ $t('product.detail.labels.owner_name') }}</span>
          </div>
          <div>
            <span class="link text-overline" @click="redirectDetailPage">{{ owner.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <v-tabs v-model="tab">
        <v-tab>{{ $t('product.detail.titles.buy') }}</v-tab>
        <v-tab>{{ $t('product.detail.titles.detail') }}</v-tab>
        <v-tab v-if="isAuction">{{ $t('product.detail.titles.bid_history') }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab" class="mt-2">
        <v-tab-item class="pa-1">
          <v-card elevation="2" v-if="!isAuction">
            <v-card-text>
              <div class="d-flex justify-start align-center">
                <div>
                  <span>{{ $t('product.detail.labels.price') }}</span>
                </div>
                <div class="ml-auto">{{ fixedPrice }}</div>
              </div>
            </v-card-text>
          </v-card>
          <Auction v-if="isAuction" :item="item.exhibit" />
          <v-card elevation="2" class="mt-2">
            <v-card-text>
              <div class="text-subtitle-1 mt-2 mb-2">
                {{ $t('product.detail.labels.contract') }}
              </div>
              <div>
                <a target="_blank" :href="contractAddress">Contract Address</a>
              </div>
              <ListItem left="Token ID" right="1" />
              <ListItem left="Token Standard" right="ERC721" />
              <ListItem left="Blockchain" right="BSC" />
            </v-card-text>
          </v-card>
          <div class="mt-4 text-body-2" v-if="!isLogin">
            {{ $t('product.detail.labels.login_text_left') }}
            <v-btn depressed color="primary" @click="redirectLogin">{{ $t('product.detail.labels.login') }}</v-btn>
            {{ $t('product.detail.labels.login_text_right') }}
          </div>
          <Buy :item="item" v-if="isLogin && !isAuction" />
          <Bid :id="id" :item="item.exhibit" v-if="isLogin && isAuction" />
        </v-tab-item>
        <v-tab-item class="pa-1">
          <v-card elevation="2">
            <v-card-text>
              <ListItem :left="$t('product.detail.labels.listing_at')" :right="startAt" />
            </v-card-text>
          </v-card>
          <v-card elevation="2" class="mt-2">
            <v-card-text>
              <div class="text-subtitle-1 mt-2 mb-2">
                {{ $t('product.detail.labels.description') }}
              </div>
              <div class="text-body-1">
                <div class="description" v-html="autoLink(item.description || '')"></div>
              </div>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="isAuction">
          <AuctionHistory :items="item.bids || []" />
        </v-tab-item>
      </v-tabs-items>
    </div>

    <div class="mt-2">
      <LikeTop :items="item.other_products" />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Like from '@/components/products/Like.vue';
import LikeTop from '@/components/products/LikeTop.vue';
import Auction from '@/components/products/Auction.vue';
import Buy from '@/components/products/Buy.vue';
import Bid from '@/components/products/Bid.vue';
import AuctionHistory from '@/components/products/AuctionHistory.vue';
import autoLink from 'autolink.js';

export default {
  components: { Like, LikeTop, Auction, AuctionHistory, Buy, Bid },
  props: {
    id: {
      type: [String, Number],
    },
  },
  data() {
    return { tab: null, like: null };
  },
  created() {
    this.request({ id: this.id });
  },
  computed: {
    ...mapState({
      item: (state) => state.api.user.product_detail.data || {},
      isLogin: (state) => !!state.user.currentUser.uid,
    }),
    owner() {
      return this.item.owner || {};
    },
    fixedPrice() {
      const { exhibit: { fixed_price } = {} } = this.item;
      const price = fixed_price || '';
      return `${price}${this.$t('append.amount_unit')}`;
    },
    startAt() {
      const { exhibit: { start_at } = {} } = this.item;
      return new Date(start_at).toLocaleString();
    },
    contractAddress() {
      return this.$config.explorerURL + this.item.contract_address;
    },
    favorite() {
      return this.like !== null ? this.like : this.item.favorited;
    },
    isAuction() {
      const { exhibit: { price_type } = {} } = this.item;
      return price_type === 'auction';
    },
  },
  methods: {
    ...mapActions({
      request: 'api/user/product_detail/request',
    }),
    likeChanged(value) {
      this.like = value;
    },
    redirectLogin() {
      this.$router.push('/login');
    },
    redirectDetailPage() {
      const typePath = this.owner.owner_type === 'User' ? 'users' : 'shops';
      this.$router.push(`/${typePath}/${this.owner.name}`);
    },
    autoLink,
  },
};
</script>

<style lang="scss" scoped>
.editor {
  ::v-deep textarea {
    border: none;
    outline: none;
    resize: none;
  }

  ::v-deep .v-input__slot::before,
  ::v-deep .v-input__slot::after {
    display: none;
  }
}

.description {
  min-height: 100px;
  max-height: 150px;
  word-break: all;
  overflow-y: auto;
}

.link {
  color: blue;
}
</style>
