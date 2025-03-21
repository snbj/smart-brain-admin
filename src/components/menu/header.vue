<template>
    <div class="block flex items-center justify-between">
        <div class="flex  items-center" style="margin-left: var(--menu-width);">
            <svg @click="$emit('onRefresh')" class="ml-4 cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="20"
                height="20" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="M5.463 4.433A9.96 9.96 0 0 1 12 2c5.523 0 10 4.477 10 10c0 2.136-.67 4.116-1.81 5.74L17 12h3A8 8 0 0 0 6.46 6.228zm13.074 15.134A9.96 9.96 0 0 1 12 22C6.477 22 2 17.523 2 12c0-2.136.67-4.116 1.81-5.74L7 12H4a8 8 0 0 0 13.54 5.772z" />
            </svg>
            <el-header class="header cursor-default">
                <el-breadcrumb separator="/">
                    <template v-for="item in menuStore.list" :key="item.path">
                        <el-breadcrumb-item
                            v-if="route.path == item.path || (route.matched.length && route.matched[0].path == item.path)">
                            {{ item.meta.title }}
                        </el-breadcrumb-item>
                        <template v-for="children in item.children">
                            <el-breadcrumb-item v-if="route.path == children.path">
                                {{ children.meta.title }}
                            </el-breadcrumb-item>
                        </template>
                    </template>
                </el-breadcrumb>
            </el-header>
        </div>
        <div class="avatar">
            <el-dropdown ref="dropdown1" trigger="click">
                <img width="32" src="@/assets/imgs/avatar.png" />
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item disabled>
                            <div class="p-2 flex w-48">
                                <img class="dropdown-avater" src="@/assets/imgs/avatar.png" />
                                <div>
                                    <div class="ml-2 truncate">
                                        {{ userStore.userInfo.username }}
                                    </div>
                                    <div class="ml-2 text-muted-foreground truncate">
                                        {{ userStore.userInfo.email }}
                                    </div>
                                </div>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item divided @click="passwordChange">
                            <div class="p-2 w-40 flex">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0zM5 10v10h14V10zm6 4h2v2h-2zm-4 0h2v2H7zm8 0h2v2h-2zm1-6V7a4 4 0 0 0-8 0v1z" />
                                </svg>
                                <span class="ml-2"> 修改密码</span>
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item @click="handleLogout" class="mt-2">
                            <div class="p-2 w-40 flex">

                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                                    <path fill="currentColor"
                                        d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1zm13-6v-3h-7v-2h7V8l5 4z" />
                                </svg> <span class="ml-2"> 退出登录</span>
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMenuStore } from "@/store/modules/menu"
import { useUserStore } from '@/store/modules/user';
const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const menuStore = useMenuStore();
const emits = defineEmits(['logout']);
const handleLogout = () => {
    emits('logout');
};
const passwordChange = () => {
    router.push('/passwordChange');
}
</script>
<style lang="scss" scoped>
.block {
    background-color: var(--backgroundBackColor);
    border-bottom: 1px solid var(--border-color) !important;
    height: var(--header-height);
    position: absolute;
    width: 100%;
    left: 0px;
    z-index: 0;
}

.header {
    height: var(--header-height);
    padding: 18px 0px 0px 12px;
}

.avatar {
    img {
        border-radius: 50%;
    }

    margin-right:18px;
    border-radius: 50%;
    border: 6px solid var(--backgroundBackColor);

    &:hover {
        border: 6px solid hsl(216 5% 19%)
    }
}

.dropdown-avater {
    width: 48px;
    height: 48px;
    border-radius: 50%;
}

::v-deep .el-dropdown-menu__item.is-disabled {
    cursor: unset;
}

.truncate {
    max-width: 120px;
}
</style>
