<template>
  <div class="personal-header">
    <div class="personal-header-img">
      <img v-if="currentUser.photoURL" :src="currentUser.photoURL" />
      <img v-else src="@/assets/img/svg/user.svg" />
    </div>
    <div class="personal-header-info">
      <h2>{{ currentUser.displayName }}</h2>
      <div class="info-con" style="white-space: pre-wrap; word-wrap:break-word;">{{ currentUser.introduction }}<p>
        <router-link :to="'/users/' + currentUser.displayName">{{ $t('banner.homepage') }}</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState({
      currentUser: (state) => state.user.currentUser,
    }),
  },
};
</script>

<style lang="scss" scoped>
.personal-header {
  padding: 50px 15px;
  background: linear-gradient(214deg, #0E7868 0%, #369465 100%);
  color: #fff;
  display: flex;
}
.personal-header-img {
  width: 60px;
  height: 100%;
}
.personal-header-img img {
  overflow: hidden;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.personal-header-info {
  width: calc(100% - 80px);
  padding-left: 20px;
  color: #fff;
}
.personal-header-info h2 {
  line-height: 24px;
  font-size: 16px;
}
.personal-header-info .share {
  height: 24px;
  margin-bottom: 30px;
}
.personal-header-info .share img {
  display: inline-block;
  width: 24px;
  height: 24px;
  margin-right: 16px;
}
.personal-header-info .info-con {
  width: 100%;
  line-height: 22px;
  font-size: 16px;
  color: #ffffff;
  letter-spacing: 0.84px;  
}
.personal-header-info .info-con p{
  margin-top: 25px;
  font-size: 16px;
}
.personal-header-info .info-con p a{
  color: #d6f5eb;
}
.personal-header-info .homepage {
  display: flex;
  justify-content: space-between;

}
.personal-header-info .homepage a {
  line-height: 22px;
  font-size: 16px;
  color: #ffffff;
}
.personal-header-info a{
  color:  #d6f5eb !important;
}
.personal-header-info a:visited,
.personal-header-info a:active{
  color:  #d6f5eb;
}
.personal-header-info a:hover{
  opacity: 0.8;
}
</style>
