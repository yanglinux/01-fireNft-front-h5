<template>
  <v-card class="item mx-auto" max-width="374" @click="toDetailPage">
    <v-img :src="item.cover_image_url"></v-img>
    <img :src="product.cover_image_url ? product.cover_image_url : 'defaultCoverImage'" @error="replaceCoverImgByDefault" />

    <div class="pa-2">
      <div class="text-ellipsis" style="font-size:14px;">{{ item.title }}</div> 
      <section class="intro-user clearfix" v-if="item.owner.owner_type == 'User'">
        <span class="intro-user-head"><img :src="item.owner.image_url ? item.owner.image_url : 'defaultHeadImage'" @error="replaceHeadImgByDefault" /></span>
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
        <div class="dz" :class="{'ydz': item.favorited}" style="cursor: unset;" @click="setFavorites">
          <img src="@/assets/img/svg/wdz.svg" v-if="!item.favorited"/>
          <img src="@/assets/img/svg/ydz.svg" v-if="item.favorited"/>{{ item.favorites_count }}
        </div>
      </section>       
    </div>
   
  </v-card>
</template>

<script>
import defaultCoverImage from "@/assets/img/img1.jpg";
import defaultHeadImage from "@/assets/img/head.jpg";
export default {
  props: {
    item: {
      type: Object,
      default: () => {},
    },
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
    replaceCoverImgByDefault(event) {
      event.target.src = defaultCoverImage;
    },   
    replaceHeadImgByDefault(event) {
      event.target.src = defaultHeadImage;
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
