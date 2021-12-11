<template>
  <div class="d-flex justify-start align-center">
    <div>
      <span>{{ left }}</span>
    </div>
    <div class="ml-auto">{{ right }}</div>
  </div>
</template>

<script>
export default {
  props: {
    left: {
      type: [String, Number],
    },
    right: {
      type: [String, Number],
    },
  },
};
</script>
