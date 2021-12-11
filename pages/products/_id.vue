<template>
  <div>
    <Detail :id="$route.params.id" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Detail from '@/components/products/Detail.vue';

export default {
  components: { Detail },
  data() {
    return {};
  },
  created() {},
  methods: {
    ...mapActions({}),
  },
};
</script>
