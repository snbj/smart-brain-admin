import { home } from "../enums";
export default {
    path: "/",
    component: () => import("@/views/home/home.vue"),
    name: 'home',
    meta: {
        title: "分析页",
        rank: home,
        showLink: true,
        icon: "ri:align-item-bottom-fill",

    }
} satisfies RouteConfigsTable;
