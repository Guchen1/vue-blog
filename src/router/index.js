import { createWebHistory, createRouter } from "vue-router";
const routes = [{

        path: "/login",
        name: "login",
        component: () =>
            import ("../views/LogIn.vue"),
    },
    {
        path: "/link",
        name: "link",
        component: () =>
            import ("../views/FriendLink.vue"),
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
            import ("../views/DocMain.vue"),

    }, {
        path: "/doc/:id",
        name: "doc-detail",
        component: () =>
            import ("../views/PostShow.vue"),
    },
    {
        path: "/load",
        name: "load",
        component: () =>
            import ("../components/LoadingPage.vue")
    }, {
        path: "/back",
        name: "back",
        component: () =>
            import ("../views/BackPage.vue"),
        children: [{
                path: "",
                name: "overview",
                component: () =>
                    import ("../views/BackPage/OverView.vue")
            }, {
                name: "mainset",
                path: 'mainset',
                // 单个router-view用：component
                component: () =>
                    import ("../views/BackPage/MainSet.vue")
            },
            {
                name: "friendset",
                path: 'friendset',
                // 单个router-view用：component
                component: () =>
                    import ("../views/BackPage/FriendSet.vue")
            }, {
                name: "passageset",
                path: 'passageset',
                // 单个router-view用：component
                component: () =>
                    import ("../views/BackPage/PassageSet.vue"),
                children: [{
                    path: "new",
                    name: "new",
                    component: () =>
                        import ("../views/BackPage/PassageSet/NewP.vue")
                }]
            },
            {
                name: "etcset",
                path: 'etcset',
                // 单个router-view用：component
                component: () =>
                    import ("../views/BackPage/EtcSet.vue")
            },
        ]
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