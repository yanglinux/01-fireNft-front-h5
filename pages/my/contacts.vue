<template>
  <v-card>
    <v-card-title>
      {{ $t('my.contacts.title') }}
    </v-card-title>
    <v-card-text>
      <v-form v-model="valid" ref="form">
        <v-text-field
          hide-details
          :rules="[...rule, ruleEmail]"
          type="email"
          v-model="form.email"
          :label="$t('my.contacts.from_email')"
        ></v-text-field>
        <v-text-field
          hide-details
          :rules="rule"
          v-model="form.title"
          :label="$t('my.contacts.from_title')"
        ></v-text-field>
        <v-textarea
          hide-details
          :rules="rule"
          v-model="form.body"
          :label="$t('my.contacts.from_contents')"
        ></v-textarea>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" block @click="() => request(form)" :disabled="!valid">
        {{ $t('buttons.sent') }}
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
      form: {
        email: '',
        title: '',
        body: '',
      },
      rule: [(v) => !!v],
      ruleEmail: (email) => {
        const re =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (this.error) this.toast({ text: this.$t('message.error_contacts_sent_failure'), type: 'error' });
        else {
          this.toast({ text: this.$t('message.info_contacts_sent_success'), type: 'success' });
          this.$refs.form.reset();
        }
      }
    },
  },
  computed: {
    ...mapState({
      loading: (state) => state.api.my.contacts.onFetch,
      error: (state) => state.api.my.contacts.error,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/my/contacts/request',
      toast: 'toast/add',
    }),
  },
};
</script>
