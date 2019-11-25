import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: Dashboard,
        },
        {
            path: "/content",
            name: "content",
            redirect: "/content/1",
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import(/* webpackChunkName: "content" */ "./views/Content.vue"),
            children: [
                {
                    path: "/content/:id",
                    component: () =>
                        import(
                            /* webpackChunkName: "node" */ "./views/Node.vue"
                        ),
                },
            ],
        },
    ],
});
