<template>
  <v-card class="item mx-auto" max-width="374" @click="toDetailPage">
    <v-img :src="item.cover_image_url" v-if="item.cover_image_url"></v-img>
    <v-img :src="defaultCoverImage" v-else></v-img>

    <div class="pa-2">
      <div class="text-ellipsis" style="font-size:14px;">{{ item.title }}</div> 
      <section class="intro-user clearfix" v-if="item.owner.owner_type == 'User'">
        <span class="intro-user-head">
          <img :src="defaultHeadImage" v-if="!item.owner.image_url" />
          <img :src="item.owner.image_url" v-else />
        </span>
        <p class="intro-user-info">{{ $t('product.detail.labels.owner_name') }}</p>
        <p class="intro-user-name text-ellipsis">
          <router-link :to="'/users/' + item.owner.name">{{ item.owner.name }}</router-link>
        </p>
      </section>
      <section class="intro-user clearfix" v-else>
        <span class="intro-user-head"><img src="@/assets/img/svg/shop.svg" /></span>
        <p class="intro-user-info">{{ $t('product.detail.labels.owner_name') }}</p>
        <p class="intro-user-name text-ellipsis">
          <router-link :to="'/shops/' + item.owner.name">{{ item.owner.name }}</router-link>
        </p>
      </section>
      <section class="intro-tabs">
        <h3>JPY <span>¥{{ getPrice() }}</span></h3>
        <div class="dz" :class="{'ydz': item.favorited}" style="cursor: unset;" @click.stop="setFavorites">
          <img src="@/assets/img/svg/wdz.svg" v-if="!item.favorited"/>
          <img src="@/assets/img/svg/ydz.svg" v-if="item.favorited"/>{{ item.favorites_count }}
        </div>
      </section>       
    </div>
   
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import defaultCoverImage from "@/assets/img/img1.jpg";
import defaultHeadImage from "@/assets/img/head.jpg";

export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.user.currentUser,      
    }),
  },
  data() {
    return { defaultHeadImage,defaultCoverImage};
  },
  methods: {
    getPrice(currency) {
      let price = '';
      const { exhibit } = this.item;
      if (!exhibit) price = '';
      else {
        const { price_type } = exhibit;
        const prop = price_type === 'auction' ? 'current_price' : 'fixed_price';
        price = exhibit[[prop, currency].filter((x) => x).join('_')];
      }
      return price;
    },
    toDetailPage() {
      this.$router.push(`/products/${this.item.id}`);
    }, 
    async setFavorites() {
      if (this.currentUser.uid === undefined) {
        this.$router.push('/login');
        return;
      }
      if (this.item.favorited === true) {
        this.$axios
          .delete(`/v1/products/${this.item.id}/favorite`)
          .then((response) => {
            this.item.favorited = false;
            this.item.favorites_count = this.item.favorites_count - 1;
          })
          .catch((e) => {
            console.log(e);
          });
      } else {
        this.$axios
          .post(`/v1/products/${this.item.id}/favorite`)
          .then((response) => {
            this.item.favorited = true;
            this.item.favorites_count = this.item.favorites_count + 1;
          })
          .catch((e) => {
            console.log(e);
          });
      }

    },
  },
};
</script>

<style scoped>
.intro-user {
  padding: 12px 0;
}

.intro-user-head {
  overflow: hidden;
  float: left;
  margin-right: 10px;
  border-radius: 24px;
  width: 34px;
  height: 34px;
}

.intro-user-head img{
  border-radius: 24px;
  width: 34px;
  height: 34px;
}

.intro-user-info {
  line-height: 17px;
  font-size: 12px;
  color: #969190;
  margin: 0 !important;
}

.intro-user-name {
  line-height: 17px;
  font-size: 14px;
  color: #231815;
  margin: 0 !important;
}

.intro-user-name a,
.intro-user-name a:hover,
.intro-user-name a:active,
.intro-user-name a:visited{
  color:#0E7868;
  text-decoration: none;
}
.intro-tabs h3 {
  line-height: 20px;
  font-size: 14px;
  color: #191D2B;
  font-weight: normal;
}

.intro-tabs h3 span{
  font-size: 18px;
}

.intro-tabs .dz {
  position: absolute;
  z-index: 0;
  bottom: 10px;
  right: 16px;
  color: #969190;
  font-size: 14px;
  cursor: pointer;
  line-height: 14px;
}
.intro-tabs .dz.ydz {
  color: #ff609b;
}
.intro-tabs .dz img {
  float: left;
  width: 13px;
  height: 13px;
  margin-right: 3px;
  border-radius: 0;
  vertical-align: middle;
}
</style>
