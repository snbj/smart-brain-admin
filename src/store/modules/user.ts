import { defineStore } from 'pinia';
import { getLogin } from "@/api/user"

export const useUserStore = defineStore('login', {
    state: (): any => ({
        userInfo: {},
    }),
    actions: {
        async login(username: string, password: string) {
            try {
                const response = await getLogin({
                    name: username,
                    pwd: password
                })
                if (!response) return false
                localStorage.setItem('userInfo', JSON.stringify(response));
                this.userInfo = response
                return true;

            } catch (error) {
                console.error('登录出错:', error);
                return false;
            }
        },
        logout() {
            this.userInfo = {};
            localStorage.removeItem('userInfo');
        },
        initLoginState() {
            const storedUserInfo = localStorage.getItem('userInfo');
            if (storedUserInfo) {
                this.userInfo = JSON.parse(storedUserInfo);
            }
        }
    },
    getters: {
        accessToken: (state: any) => state.userInfo.accessToken
    }
});    