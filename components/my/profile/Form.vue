<template>
  <section>
    <v-card class="my-profile-box">
      <v-card-text>
        <v-form :disabled="loading || error" class="my-profile-form"  ref="form">
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
          <v-text-field class="mb-2 d-flex align-center form-account" hide-details v-model="form.twitter" label="twitter（Account）">
              <template #prepend>
                <div>https://twitter.com/</div>
              </template>
            </v-text-field>
            <v-text-field class="mb-2 d-flex align-center form-account" hide-details v-model="form.instagram" label="instagram（Account）">
              <template #prepend>
                <div>https://www.instagram.com/</div>
              </template>
            </v-text-field>
            <v-text-field class="mb-2 d-flex align-center form-account" hide-details v-model="form.facebook" label="facebook（Account）">
              <template #prepend>
                <div>https://www.facebook.com/</div>
              </template>
            </v-text-field>

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
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      image_tmp: '',
      model: true,
      form: {
        nick_name: '',
        introduction: '',
        image: null,
        tel: '',
        twitter: '',
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

          const { nick_name: displayName, image: photoURL, ...profile } = this.profile;
          this.setAuthUser({
            ...this.currentUser,
            ...profile,
            displayName,
            photoURL,
          });
        }
      }
    },
    updateLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.updateError) {
          this.toast({ text: this.$t('message.info_user_update_success'), type: 'success' });
          this.getProfile();
        } else {
          this.toast({ text: this.updateData.errors[0], type: 'error' });
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
      updateData: (state) => state.api.my.profile_update.data,
    }),
  },
  methods: {
    ...mapActions({
      getProfile: 'api/my/profile/request',
      request: 'api/my/profile_update/request',
      toast: 'toast/add',
      setAuthUser: 'user/setAuthUser',
    }),
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
      const valid = this.$refs.form.validate();
      if (valid) this.request(form);
    },
    checkFile(v) {
      if (!v) return true;
      return /\.(png|gif|jpg|jpeg)$/i.test(v) || this.$t('message.error_image_file_type');
    },
  },
};
</script>

<style lang="scss">
  .form-account{
    position: relative;
      z-index: 0;
  }
  .form-account .v-input__prepend-outer{
      margin: 0 !important;
      height: 50px !important;
      line-height: 33px;
      max-height: 50px !important;
      border-radius: 6px;
      padding: 8px 10px;  
      font-size: 12px;
      border: 1px solid #cacaca;
      background-color: #e9ecef;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
      border-right: 0;      
  }
  .form-account input{
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  .form-account .v-label{
    top:0 !important;
  }
  .form-account .v-input__slot,
  .form-account .v-text-field__slot{
    position: inherit !important;
  }
</style>
    
