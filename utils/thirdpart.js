export default {
  methods: {
    redirectTo(name, extend) {
      const redirectUri = encodeURIComponent(`${window.location.protocol}//${window.location.host}/callback/${name}`);
      let href = '';
      switch (name) {
        case 'facebook':
          href = `${this.$config.omniauth.facebookAuthUrl}&redirect_uri=${redirectUri}`;
          break;
        default:
          href = `${process.env.BASE_URL}/v1/auth/${name}?auth_origin_url=${redirectUri}`;
          break;
      }

      if (extend) href += `&${extend}`;
      window.location = href;
    },
  },
};
