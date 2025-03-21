<template>
    <el-menu :default-active="activeMenu" mode="vertical" class="p-4 dark bg-sidebar border-border border-r z-1">
        <div class="text-foreground lg:text-foregroundflex flex items-center m-4 mb-2">
            <img class="mr-2" width="36" src="@/assets/icon/logo-v1.webp">
            <p class="m-0 text-base font-medium">SMART BRAIN</p>
        </div>
        <template v-for="item in menuStore.list" :key="item.path">
            <template v-if="item.meta.showLink == true">
                <el-sub-menu v-if="item.children && item.children.length" :index="item.path"
                    @mouseenter="isMenuHovered = item.path" @mouseleave="isMenuHovered = ''">
                    <template #title>
                        <Icon :class="{ 'scale-130': isMenuHovered === item.path }" :icon="item.meta.icon"
                            class="transition-transform duration-200 mr-2 text-lg" />
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <el-menu-item v-for="children in item.children" :index="children.path"
                        @click="handleMenuClick(children.path)" @mouseenter="isMenuItemHovered = children.path"
                        @mouseleave="isMenuItemHovered = ''">
                        <template #title>
                            <Icon :class="{ 'scale-130': isMenuItemHovered === children.path }"
                                :icon="children.meta.icon" class="transition-transform duration-200 mr-2 text-lg" />
                            <span>{{ children.meta.title }}</span>
                        </template>
                    </el-menu-item>
                </el-sub-menu>
                <el-menu-item v-else :index="item.path" @click="handleMenuClick(item.path)"
                    @mouseenter="isMenuHovered = item.path" @mouseleave="isMenuHovered = ''">
                    <template #title>
                        <Icon :class="{ 'scale-130': isMenuHovered === item.path }" :icon="item.meta.icon"
                            class="transition-transform duration-200 mr-2 text-lg" />
                        <span>{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
</template>

<script lang="ts" setup>
import { ref, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { useMenuStore } from "@/store/modules/menu"

const router = useRouter();
const menuStore = useMenuStore();
console.log(menuStore, 'menuStore')
const emits = defineEmits(['logout']);
const isMenuItemHovered = ref('');
const isMenuHovered = ref('')
const activeMenu = ref('home');

const handleMenuClick = (val: string) => {
    activeMenu.value = val;
    router.push(val);
};

const handleLogout = () => {
    emits('logout');
};
</script>

<style scoped>
.el-menu {
    width: var(--menu-width);
    background-color: var(--backgroundBackColor);
    border-right: 1px solid var(--border-color) !important;
}

/* 重置可能影响子菜单显示的样式 */
.el-menu--vertical {
    border-right: none;
}

.el-sub-menu .el-menu {
    min-width: 100%;
}

/* 确保子菜单展开过渡正常 */
.el-sub-menu__title:hover+.el-menu {
    display: block;
}

.el-menu--collapse .el-sub-menu.is-active .el-menu {
    display: block;
}
</style>