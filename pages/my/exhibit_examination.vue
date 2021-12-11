<template>
  <div>
    <div class="text-h6 mb-2">{{ $t('my.exhibitExamination.title') }}</div>
    <div v-if="loading" class="d-flex justify-center align-center">
      <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
    </div>
    <Unapplied v-if="loaded && !examination.status" />
    <Requested v-else-if="loaded && examination.status" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Unapplied from '@/components/my/exhibit_examination/Unapplied.vue';
import Requested from '@/components/my/exhibit_examination/Requested.vue';

export default {
  components: { Unapplied, Requested },
  data() {
    return {
      init: false,
    };
  },
  watch: {
    loading(next, prev) {
      if (next === false && prev === true) {
        if (!this.error) {
        }
      }
    },
  },
  created() {
    this.request();
  },
  computed: {
    ...mapState({
      examination: (state) => state.api.my.exhibit_examination.data || {},
      loaded: (state) => state.api.my.exhibit_examination.loaded,
      loading: (state) => state.api.my.exhibit_examination.onFetch,
      error: (state) => state.api.my.exhibit_examination.error,
    }),
  },
  methods: {
    ...mapActions({
      request: 'api/my/exhibit_examination/request',
    }),
  },
};
</script>
