<template>
  <section>
    <v-card class="my-profile-box">
      <v-card-text>
        <v-form :disabled="loading || error" class="my-profile-form">
          <v-text-field
            class="mb-2"
            hide-details
            v-model="form.nick_name"
            :label="$t('my.profile.nick_name')"
          ></v-text-field>
          <v-textarea
            class="mb-2"
            hide-details
            v-model="form.introduction"
            :label="$t('my.profile.introduction')"
          ></v-textarea>

          <div class="mb-2">
            <v-img v-if="image_tmp" :src="image_tmp" height="200" class="grey darken-4"></v-img>
            <v-img
              v-else
              src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              height="200"
              class="grey darken-4"
            />
            <v-file-input
              ref="file"
              @change="uploadImage"
              prepend-icon="mdi-camera"
              accept="image/png, image/gif, image/jpeg"
            />
          </div>

          <v-text-field
            :value="currentUser.email"
            class="mb-2"
            readonly
            hide-details
            :label="$t('my.profile.email')"
          ></v-text-field>
          <v-text-field class="mb-2" hide-details v-model="form.tel" :label="$t('my.profile.tel')"></v-text-field>
          <v-text-field class="mb-2" hide-details v-model="form.twiter" label="twitter（Account）"></v-text-field>
          <v-text-field class="mb-2" hide-details v-model="form.instagram" label="instagram（Account）"></v-text-field>
          <v-text-field class="mb-2" hide-details v-model="form.facebook" label="facebook（Account）"></v-text-field>

          <v-divider class="mt-5 mb-5" />

          <div class="text-body-1">{{ $t('my.profile.delivery') }}</div>
          <v-text-field class="mb-2" hide-details v-model="form.name" :label="$t('my.profile.name')"></v-text-field>
          <v-text-field
            class="mb-2"
            hide-details
            v-model="form.zip_code"
            :label="$t('my.profile.zip_code')"
          ></v-text-field>
          <v-text-field class="mb-2" hide-details v-model="form.address" :label="$t('my.profile.address')"></v-text-field>
        </v-form>
      </v-card-text>    
    </v-card>
    <footer class="pl-2 pr-2 mt-6 mb-2">
      <v-btn :loading="updateLoading" :disabled="loading || error" block @click="onSubmit" class="btn-green-radius-large">
        {{ $t('buttons.change') }}
      </v-btn>
    </footer>
  </section>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      image_tmp: '',
      form: {
        nick_name: '',
        introduction: '',
        image: null,
        tel: '',
        twiter: '',
        instagram: '',
        facebook: '',
        name: '',
        zip_code: '',
        address: '',
        gender: '',
      },
      rule: [(v) => !!v],
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          Object.keys(this.profile).forEach((key) => {
            if (key === 'image') this.image_tmp = this.profile[key];
            else if (this.profile[key] && this.form.hasOwnProperty(key)) {
              this.form[key] = this.profile[key];
            }
          });
        }
      }
    },
    updateLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.updateError) {
          this.toast({ text: this.$t('message.info_user_update_success'), type: 'success' });
        } else {
          this.toast({ text: this.$t('message.error_user_update_failure'), type: 'error' });
        }
      }
    },
  },
  created() {
    this.getProfile();
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.user.currentUser,
      loading: (state) => state.api.my.profile.onFetch,
      error: (state) => state.api.my.profile.error,
      profile: (state) => state.api.my.profile.data,
      updateLoading: (state) => state.api.my.profile_update.onFetch,
      updateError: (state) => state.api.my.profile_update.error,
    }),
  },
  methods: {
    ...mapActions({
      getProfile: 'api/my/profile/request',
      request: 'api/my/profile_update/request',
      toast: 'toast/add',
    }),
    ...mapMutations('user', ['SET_AUTH_USER', 'SET_TWO_AUTH']),
    fireUpload() {
      this.$refs.file.value = '';
      this.$refs.file.click();
    },
    loadImage(file) {
      const fr = new FileReader();
      fr.onload = () => {
        this.image_tmp = fr.result;
      };
      fr.readAsDataURL(file);
    },
    uploadImage(image) {
      if (image) {
        this.form.image = image;
        this.loadImage(image);
      }
    },
    onSubmit() {
      const form = new FormData();
      Object.keys(this.form).forEach((key) => {
        if (this.form[key] && this.form.hasOwnProperty(key)) form.append(key, this.form[key]);
      });
     
      const photoURL = this.form.image;
      this.SET_AUTH_USER({
        authUser: {
          photoURL
        },
      });
      this.request(form);
    },
  },
};
</script>
