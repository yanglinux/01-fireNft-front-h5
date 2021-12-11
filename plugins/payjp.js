import Vue from 'vue';

export default ({ store, isHMR }) => {
  if (isHMR) return;
  if (process.client) {
    //Vue.prototype.$payjp = window.Payjp(process.env.PAYJP_KEY);
  }
};
