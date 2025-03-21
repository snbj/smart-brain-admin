import Login from "@/views/login/index.vue"
import { login, passwordChange } from "../enums"

export default [{
    path: "/login",
    component: Login,
    name: 'login',
    meta: {
        title: "登录",
        showLink: false,
        rank: login
    }
}, {
    path: "/passwordChange",
    component: () => import("@/views/login/passwordChange.vue"),
    name: 'passwordChange',
    meta: {
        title: "修改密码",
        showLink: false,
        rank: passwordChange
    }

}] satisfies RouteConfigsTable[]