const exclude = ['/shop/valid', '/shop/login'];
let init = false;

const shopAuth = ({ route, redirect, store }) => {
  let isLogin = store.getters['shop/user/isLogin'];
  if (!isLogin && init === false) {
    const userinfo = JSON.parse(window.localStorage.getItem('shop'));
    if (userinfo) {
      store.dispatch('shop/user/setUserinfo', userinfo);
    }
  }
  init = true;
  isLogin = store.getters['shop/user/isLogin'];
  if (!exclude.includes(route.path) && !isLogin) redirect('/shop/login');
  else if (/^\/shop\/?$/.test(route.path) && isLogin) redirect('/shop/product/manager');
};

const setDefaultAuthUser = (dispatch, { uid, profile }) => {
  const { email, nick_name: displayName, name, image: photoURL, introduction, facebook, twitter, instagram } = profile;
  dispatch('user/setAuthUser', {
    uid,
    email,
    displayName,
    name,
    photoURL,
    introduction,
    facebook,
    twitter,
    instagram,
  });
};

const defaultAuth = async ({ route, store, redirect }) => {
  // restore userinfo
  if (!store.state.user.currentUser.uid) {
    const userinfo = localStorage.getItem('headers');
    if (userinfo) {
      try {
        await store.dispatch('api/my/profile/request');
        const profileRes = store.state.api.my.profile;
        if (profileRes.error) throw new Error(this.$t('errors.can_not_get_profile'));
        const profile = profileRes.data;
        const { uid } = JSON.parse(userinfo);
        setDefaultAuthUser(store.dispatch, { uid, profile });

        await store.dispatch('api/my/two_auth/request');
        const twoAuthRes = store.state.api.my.two_auth;
        if (twoAuthRes.error) throw new Error(this.$t('errors.can_not_get_two_auth'));
        store.dispatch('user/setTwoAuth', twoAuthRes.data.actived);
      } catch (e) {
        // logout
        store.dispatch('toast/add', { type: 'error', text: e });
        store.dispatch('user/resetStore');
        localStorage.removeItem('headers');
        //redirect('/login');
      }
    }
  }

  // my collection
  if (!store.state.user.currentUser.uid && /^\/my/.test(route.path)) {
    //redirect('/login');
  }
};

export default async function (context) {
  if (/^\/shop\/|^\/shop$/.test(context.route.path)) shopAuth(context);
  else await defaultAuth(context);
}
