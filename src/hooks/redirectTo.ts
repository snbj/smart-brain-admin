import { inject } from "vue"
// 定义 redirectToLogin 函数的接口
interface RedirectToFunction {
    (val: string): void
}
let redirect: RedirectToFunction | undefined
function toLogin() {
    redirect && redirect('/login')
}
export function redirectTo() {
    redirect = inject<RedirectToFunction>('redirectTo');
    return {
        toLogin
    }
}

