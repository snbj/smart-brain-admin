import { about } from "../enums";

export default {
    path: "/about",
    meta: {
        title: "关于",
        rank: about,
        showLink: true,
        icon: 'ri:file-info-line',

    },
    children: [
        {
            path: "/about-us",
            name: "aboutUs",
            meta: {
                title: "关于我们",
                icon: 'ri:questionnaire-line',
                showLink: true,
            },
            component: () => import("@/views/about/about-us.vue")
        }, {
            path: "/contact-us",
            name: "contactUs",
            meta: {
                title: "联系我们",
                showLink: true,
                icon: 'ri:phone-line',

            },
            component: () => import("@/views/about/contact-us.vue")
        }
    ]
} satisfies RouteConfigsTable;
