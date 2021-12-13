<template>
  <div class="personal-header">
    <div class="personal-header-img">
      <img v-if="currentUser.photoURL" :src="currentUser.photoURL" />
      <img v-else src="@/assets/img/head.jpg" />
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
