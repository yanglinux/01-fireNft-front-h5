<template>
  <a target="_blank" :href="contractAddress">Contract Address</a>
</template>

<script>
export default {
  props: {
    address: {
      type: String,
      default: '',
    },
  },
  computed: {
    contractAddress() {
      return this.$config.explorerURL + this.address;
    },
  },
};
</script>
