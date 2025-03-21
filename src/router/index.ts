import { createRouter, createWebHistory } from 'vue-router'
import NProgress from "@/utils/progress";
import { useUserStore } from "@/store/modules/user"
import { useMenuStore } from "@/store/modules/menu"
import pinia from "@/store/index"
let menuStore = useMenuStore(pinia)
const modules: Record<string, any> = import.meta.glob(
    ["./modules/**/*.ts"],
    {
        eager: true
    }
);
const routes: Array<any> = []

Object.keys(modules).forEach(key => {
    if (modules[key].default instanceof Array) {
        modules[key].default.forEach((item: any) => routes.push(item))
        return
    }
    routes.push(modules[key].default)
})

routes.forEach(item => menuStore.setList(item))
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to: ToRouteType, _from, next) => {
    if (!to.matched.length) {
        next({ path: "/error/403" })
        return
    }
    const token = useUserStore().accessToken
    if (!token && to.path != "/login") {
        next({ path: "/login" })
    } else {
        NProgress.start();
        next();
    }
})
router.afterEach(() => {
    NProgress.done();
});


export default router