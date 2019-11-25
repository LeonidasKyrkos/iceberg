import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueApollo from "vue-apollo";
import { apolloClient } from "./apollo";
import _get from "lodash.get";
import "@/assets/scss/main.scss";

Object.defineProperty(Vue.prototype, "$_get", { value: _get });

Vue.config.productionTip = false;

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
});

new Vue({
    router,
    store,
    apolloProvider,
    render: h => h(App),
}).$mount("#app");
