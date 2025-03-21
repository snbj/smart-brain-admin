<template>
    <div class="absolute left-0 top-0 flex flex-1">
        <div class="text-foreground lg:text-foreground ml-4 mt-4 flex flex-1 items-center sm:left-6 sm:top-6">
            <img class="mr-2" width="42" src="@/assets/icon/logo-v1.webp">
            <p class="m-0 text-xl font-medium">SMART BRAIN</p>
        </div>
    </div>
    <div class="flex h-full">
        <div class="flex-1 select-none overflow-x-hidden h-full dark:bg-[#070709]">
            <div class="login-background absolute h-full w-full"></div>
            <div class="flex flex-col content-center h-full justify-center">
                <SloganIcon class="h-64 animate-float"></SloganIcon>
                <p class="text-center text-xl pt-6">开箱即用的管理系统</p>
                <p class="text-center text-xl pt-4">欢迎使用</p>
            </div>
        </div>
        <div class="w-[34%] flex-col-center dark:bg-background-deep bg-background flex-col-center content-center">
            <div class="p-6">
                <component :is="currentComponent" @jumpTo="jumpTo"></component>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import SloganIcon from "./icons/slogan.vue"
import Login from "./components/login.vue"
import ForgotPassword from "./components/forgotPassword.vue"
import CreateUser from "./components/createUser.vue"
const currentComponent = ref<typeof Login | typeof ForgotPassword | typeof CreateUser>(Login)

const jumpTo = function (type: string) {
    switch (type) {
        case 'forgotpassword':
            currentComponent.value = ForgotPassword
            break;
        case 'login':
            currentComponent.value = Login
            break;
        case 'createUser':
            currentComponent.value = CreateUser
        default:
            break;
    }
}

</script>
<style lang="scss" scoped>
.login-background {
    background: linear-gradient(154deg,
            #07070915 30%,
            hsl(var(--primary) / 30%) 48%,
            #07070915 64%);
    filter: blur(100px);
}

.dark {
    .login-background {
        background: linear-gradient(154deg,
                #07070915 30%,
                hsl(var(--primary) / 20%) 48%,
                #07070915 64%);
        filter: blur(100px);
    }
}

.animate-float {
    animation: float 5s linear 0ms infinite;
}
</style>