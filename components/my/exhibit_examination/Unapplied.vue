<template>
  <v-card class="mt-2">
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
      <v-btn block color="primary" :disabled="!checkbox" @click="modal = true">OK</v-btn>
    </v-card-actions>
    <MyExhibitExaminationBank :visible="modal" @hide="modal = false" />
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      modal: false,
      checkbox: false,
    };
  },
};
</script>
