<template>
  <v-dialog :value="visible" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="close">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t('buttons.regist_product') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn :loading="addLoading || editLoading" dark text @click.prevent="onSubmit">
            {{ $t(`buttons.${buttonText}`) }}
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-2">
        <v-form ref="form" lazy-validation :disabled="editLoading || addLoading || detailLoading">
          <v-text-field :rules="rules.title" v-model="form.title" :label="$t('titles.product_name')"></v-text-field>
          <v-text-field :rules="rules.brand" v-model="form.brand" :label="$t('titles.brand')"></v-text-field>

          <v-select
            :rules="rules.category_id"
            v-model="form.category_id"
            :items="options"
            :label="$t('titles.category_name')"
          ></v-select>
          <v-textarea
            v-model="form.description"
            name="input-7-4"
            :label="$t('titles.product_description')"
          ></v-textarea>

          <v-card>
            <v-img v-if="image_tmp" :src="image_tmp" height="200" class="grey darken-4"></v-img>
            <v-img
              v-else
              src="data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
              height="200"
              class="grey darken-4"
            />
            <v-file-input
              :rules="rules.image"
              ref="file"
              @change="uploadImage"
              prepend-icon="mdi-camera"
              accept="image/png, image/gif, image/jpeg"
              class="ma-2"
            />
          </v-card>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
  data: function () {
    return {
      image_tmp: null,
      form: {
        title: '',
        category_id: null,
        brand: '',
        description: '',
        image: '',
        total: 1,
      },
      rules: {
        title: [(v) => !!v || this.$t('errors.product_name_required')],
        brand: [(v) => !!v || this.$t('errors.brand_required')],
        category_id: [(v) => !!v || this.$t('errors.category_id_required')],
        image: [(v) => this.isEdit || (!this.isEdit && !!v) || this.$t('errors.product_image_required')],
      },
    };
  },
  watch: {
    id(id) {
      if (id) {
        this.getDetail({ id });
      }
    },
    detailLoading(next, prev) {
      if (prev === true && next === false) {
        if (!this.detailError) {
          const detail = this.detailData;
          this.image_tmp = detail.main_image_url;
          Object.keys(detail).forEach((key) => {
            if (this.form.hasOwnProperty(key)) this.form[key] = detail[key];
          });
          if (detail.category.id) this.form.category_id = detail.category.id;
        }
      }
    },
    editLoading(next, prev) {
      if (prev === true && next === false) {
        if (!this.editError) {
          this.setModalEdit({ id: null, visible: false });
          this.image_tmp = null;
          this.$refs.form.reset();
          this.request();
        }
      }
    },
    addLoading(next, prev) {
      if (prev === true && next === false) {
        if (!this.addError) {
          this.setModalEdit({ id: null, visible: false });
          this.$refs.form.reset();
          this.image_tmp = null;
          this.request();
        }
      }
    },
  },
  created() {
    if (this.$nuxt.layoutName) {
      this.getCategory();
    }
  },
  computed: {
    ...mapState({
      visible: (state) => state.shop.product.modalEdit.visible,
      id: (state) => state.shop.product.modalEdit.id,
      isEdit: (state) => !!state.shop.product.modalEdit.id,
      categories: (state) => state.api.category.data,
      fee: (state) => state.api.shop.fee.data,
      hasAddError: (state) => state.api.shop.product.add.data?.errors?.length || state.api.shop.product.add.error,
      addProductError: (state) => state.api.shop.product.add.data?.errors || [],
      addLoading: (state) => state.api.shop.product.add.onFetch,
      addError: (state) => state.api.shop.product.add.error,
      hasEditError: (state) => state.api.shop.product.edit.data?.errors?.length || state.api.shop.product.edit.error,
      editError: (state) => state.api.shop.product.edit.error,
      editLoading: (state) => state.api.shop.product.edit.onFetch,
      initFormData: (state) => state.shop.product.edit.detail,
      detailError: (state) => state.api.shop.product.detail.error,
      detailData: (state) => state.api.shop.product.detail.data,
      detailLoading: (state) => state.api.shop.product.detail.onFetch,
    }),
    buttonText() {
      return this.isEdit ? 'update' : 'regist';
    },
    options() {
      const items = [];
      this.categories.forEach(({ id, name }) => items.push({ value: id, text: name }));
      return items;
    },
  },
  methods: {
    ...mapActions({
      request: 'api/shop/product/items/request',
      setModalEdit: 'shop/product/setModalEdit',
      getFee: 'api/fee/request',
      addProduct: 'api/shop/product/add/request',
      editProduct: 'api/shop/product/edit/request',
      getCategory: 'api/category/request',
      toast: 'toast/add',
      getDetail: 'api/shop/product/detail/request',
      setDetail: 'shop/product/edit/setDetail',
    }),
    generateForm() {
      return {
        title: '',
        category_id: 1,
        brand: '',
        description: '',
        image: '',
      };
    },
    onSubmit() {
      if (this.$refs.form.validate()) {
        const formdata = new FormData();
        Object.keys(this.form).forEach((key) => {
          formdata.append(key, this.form[key]);
        });

        if (this.isEdit) {
          formdata.append('id', this.id);
          if (!this.form.image) formdata.delete('image');
          this.editProduct(formdata);
        } else this.addProduct(formdata);
      }
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
    close() {
      this.setModalEdit({ id: null, visible: false });
      this.$refs.form.reset();
    },
  },
};
</script>
