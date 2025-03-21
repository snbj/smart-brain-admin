import { getCurrentInstance } from 'vue'

export function useLogin() {
    const instance = getCurrentInstance()
    return {
        showLoging: (title?: string) => {
            instance?.appContext.config.globalProperties.$showLoging(title)
        },
        hideLoging: () => {
            instance?.appContext.config.globalProperties.$hideLoging()
        }
    }
}