const sorts = function () {
  return [
    {
      title: this.$t('index.sorts.hot'),
      value: 'hot_desc',
    },
    {
      title: this.$t('index.sorts.date'),
      value: 'sale_start_desc',
    },
    {
      title: this.$t('index.sorts.price'),
      value: 'price_desc',
    },
  ];
};

export { sorts };
