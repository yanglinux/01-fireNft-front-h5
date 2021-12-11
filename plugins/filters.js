import Vue from 'vue';
import Moment from 'moment';
import autoLink from 'autolink.js';

Vue.filter('date', function (value) {
  return value ? Moment(value).format('YYYY/MM/DD HH:mm:ss') : '';
});

Vue.filter('money', function (value, unit = '') {
  return value ? value.toLocaleString() + unit : '';
});

Vue.filter('autolink', function (value = '') {
  return autoLink(value);
});
