import { createWebHistory, createRouter } from "vue-router";
const routes = [{

        path: "/login",
        name: "login",
        component: () =>
            import ("../views/LogIn.vue"),
    },
    {
        path: "/setting",
        name: "settings",
        component: () =>
            import ("../views/SettingChange.vue"),
    },
    {
        path: "/",
        name: "home",
        component: () =>
            import ("../views/MainP.vue"),
    },
    {
        path: "/doc",
        name: "doc",
        component: () =>
            import ("../views/DocP.vue"),
    },
    {
        path: "/back",
        name: "back",
        component: () =>
            import ("../views/BackPage.vue"),
    },
    {
        path: "/:catchAll(.*)",
        name: "404",
        component: () =>
            import ("../views/NF.vue"),
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;