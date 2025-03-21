<template>
  <div id="app">
    <div class="flex bg h-full" v-if="!isLoginRoute">
      <AppMenu @logout="handleLogout" />
      <div class="flex-1">
        <Header @logout="handleLogout" @onRefresh="onRefresh"></Header>
        <div class="h-full t-h-h">
          <transition name="slide-right">
            <router-view v-if="isView"></router-view>
          </transition>
        </div>
      </div>
    </div>
    <div class="h-full" v-else>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useUserStore } from "@/store/modules/user";
import Header from "@/components/menu/header.vue"
import AppMenu from '@/components/menu/index.vue';
const router = useRouter();
const route = useRoute();
const usetStore = useUserStore()
const isLoginRoute = computed(() => route.path == '/login');
const isView = ref<boolean>(true)
const handleLogout = () => {
  usetStore.logout();
  router.push('/login');
};
const onRefresh = () => {
  isView.value = false
  setInterval(() => {
    isView.value = true
  }, 10);
}
</script>
<style lang="scss" scoped>
.bg {
  background-color: var(--backgroundMainColor);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: 0.25s cubic-bezier(0.25, 0.8, 0.5, 1);
}

.slide-right-move {
  transition: transform 0.3s;
}

.slide-right-enter-from,
.slide-right-leave-to {
  opacity: 0;
  transform: translate(15px);
}

.t-h-h {
  padding-top: var(--header-height);
}
</style>
