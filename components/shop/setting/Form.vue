<template>
  <v-card>
    <v-card-text>
      <v-form :disabled="loading" v-model="valid">
        <v-text-field
          :rules="rule"
          class="mb-2"
          hide-details
          v-model="form.name"
          :label="$t('titles.shop_name')"
        ></v-text-field>
        <v-textarea
          class="mb-2"
          hide-details
          v-model="form.description"
          :label="$t('titles.shop_description')"
        ></v-textarea>

        <v-text-field
          :rules="[...rule, ruleEmail]"
          class="mb-2"
          hide-details
          v-model="form.email"
          :label="$t('labels.email')"
        ></v-text-field>

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
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn :loading="updateLoading" :disabled="loading || error" block color="primary" @click="onSubmit">
        {{ $t('buttons.update') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      valid: true,
      image_tmp: '',
      form: {
        name: '',
        description: '',
        image: null,
        email: '',
      },
      rule: [(v) => !!v],
    };
  },
  watch: {
    updateLoading(next, prev) {
      if (next === false && prev === true) {
        if (!this.updateError) {
          this.toast({ text: this.$t('message.update'), type: 'success' });
        } else {
          this.toast({ text: this.$t('message.error_user_update_failure'), type: 'error' });
        }
      }
    },
    loading(next, prev) {
      if (prev === true && next === false) {
        if (!this.error) {
          const { image, name, description, email } = this.detail;
          this.image_tmp = image;
          this.form.name = name;
          this.form.description = description;
          this.form.email = email;
        }
      }
    },
  },
  created() {
    this.getShopDetail();
  },
  computed: {
    ...mapState({
      detail: (state) => state.api.shop.setting.shop.data,
      loading: (state) => state.api.shop.setting.shop.onFetch,
      error: (state) => state.api.shop.setting.shop.error,
      updateLoading: (state) => state.api.shop.setting.shop_update.onFetch,
      updateError: (state) => state.api.shop.setting.shop_update.error,
    }),
  },
  methods: {
    ...mapActions({
      getShopDetail: 'api/shop/setting/shop/request',
      request: 'api/shop/setting/shop_update/request',
      toast: 'toast/add',
    }),
    ruleEmail: (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
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
      this.request(form);
    },
  },
};
</script>
