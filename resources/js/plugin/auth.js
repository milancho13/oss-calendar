const AuthPlugin = {}
AuthPlugin.install = function (Vue, router) {

  Vue.prototype.$auth = {
    user: {
      id: "",
      home_page_id: "",
    }
  }
  Vue.prototype.$auth.loginWith = async (option, params) => {
    const res = await Vue.prototype.$axios.post('/api/auth/login', params.data);
    const accessToken = res.data.access_token;
    document.cookie = `access_token=${accessToken}`
    Vue.prototype.$axios.defaults.headers.common['Authorization'] = `Bearer ${document.cookie.replace(/(?:(?:^|.*;\s*)access_token\s*\=\s*([^;]*).*$)|^.*$/, "$1")}`
    const res2 = await Vue.prototype.$axios.get('/api/myself')
    const user = res2.data
    Vue.prototype.$auth.user = user;
    router.push("/")
  };

  Vue.prototype.$auth.logout = () => {
    Vue.prototype.$axios.post('/api/auth/logout').then(res => {
      document.cookie = `access_token=`;
      Vue.prototype.$axios.defaults.headers.common['Authorization'] = ``
      router.push("/auth/login")
    }).catch(e => {
      console.error(e)
    })
  }


}

export default AuthPlugin;
