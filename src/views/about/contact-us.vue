<template>
  <div class="about">
    about121212
    <el-button @click="onLogin" type="info">Info</el-button>

  </div>

</template>
<script setup lang="ts">
import { getLogin } from "@/api/user"
import { ref, inject } from "vue";
import { useLogin } from "@/hooks/loging";
import { redirectTo } from "@/hooks/redirectTo";
import router from '@/router/index';

const { showLoging, hideLoging } = useLogin();
const onLogin = async () => {
  showLoging()
  setTimeout(() => {
    hideLoging()

  }, 3000)
  getLogin({
    name: '123',
    pwd: '3212'
  }).then((res) => {
    console.log(res.userId, 'wefwefwefew')
    router.push("/")
  }).catch((e) => {
  })
}
</script>


<style lang="scss" scoped>
@use "about.scss"
</style>
