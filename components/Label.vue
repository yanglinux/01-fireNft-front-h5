<template>
  <div class="mylabel">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: [],
    },
    color: {
      type: String,
      default: 'gray',
    },
  },
};
</script>

<style scoped>
.mylabel {
  position: absolute;
  left: -4px;
  top: 8px;
  padding: 0 5px;
  min-width: 57px;
  height: 22px;
  line-height: 22px;
  border-radius: 6px 0 5px 0;
  font-size: 12px;
  color: #fff;
  letter-spacing: 0.63px;
  text-align: center;
  background: #969190;
  z-index: 1;
}

.mylabel::after {
  display: block;
  content: '';
  position: absolute;
  left: 0px;
  top: 22px;
  width: 0;
  height: 0;
  font-size: 0;
  border-left: 4px solid transparent;
  border-top: 6px solid #231815;
}
</style>
