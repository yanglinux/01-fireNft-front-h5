<template>
  <v-card class="my-profile-box">
    <v-card-title>{{ $t('my.exhibitExamination.sub_title') }}</v-card-title>
    <v-card-text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit
      amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
      mollis orci, sed rhoncus pronin sapien nunc accuan eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
      sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam
      fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan
      eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor
      sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et
      magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus
      mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin
      sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
    </v-card-text>
    <v-card-text>
      <v-checkbox v-model="checkbox" :label="$t('my.exhibitExamination.approval_explain')"></v-checkbox>
    </v-card-text>
    <v-card-actions>
      <v-btn :loading="loading" block :disabled="!checkbox" @click="request" class="btn-green-radius-large">OK</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      checkbox: false,
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
          this.requestCheck();
        } else {
          this.toast({ text: this.$t('message.error_exhibit_examination_failure'), type: 'info' });
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.set_exhibit_examination.onFetch,
      error: (state) => state.api.my.set_exhibit_examination.error,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/my/set_exhibit_examination/request',
      requestCheck: 'api/my/exhibit_examination/request',
      toast: 'toast/add',
    }),
  },
};
</script>
