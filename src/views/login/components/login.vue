<template>
    <h2 class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
        欢迎回来 👋🏻
    </h2>
    <p class="text-muted-foreground py-3 lg:text-md text-sm text-muted-foreground">请输入您的帐户信息以开始管理您的项目</p>
    <el-form :model="form" ref="formRef" :rules="rules" class="login-form">
        <el-form-item class="pt-4" prop="username">
            <el-input size="large" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input size="large" placeholder="请输入密码" v-model="form.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
            <CustomSlideVerify ref="slideVerify" />
        </el-form-item>
        <el-form-item class="w-full">
            <div class="w-full">
                <el-checkbox v-model="form.rememberPassword">记住密码</el-checkbox>
                <el-link @click="$emit('jumpTo', 'forgotpassword')" class="float-right">忘记密码</el-link>
            </div>
        </el-form-item>
        <el-form-item>
            <el-button size="large" type="primary" class="w-full" @click="handleLogin">登录</el-button>
        </el-form-item>
    </el-form>
    <div class="mt-6 text-center text-sm w-full">还没有账号?
        <el-link type="primary" @click="$emit('jumpTo', 'createUser')">创建账号</el-link>
    </div>

</template>
<script setup lang="ts">
import CustomSlideVerify from '@/components/customSlideVerify/index.vue';
import { ElForm, ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';
import { LoginForm } from "../interface";
import { ruleUsername, rulePassword } from "@/utils/validte"
import { useUserStore } from "@/store/modules/user"
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const form = reactive<LoginForm>({
    username: '',
    password: '',
    rememberPassword: false
});

const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const slideVerify = ref();
const rules = reactive<FormFieldValidationRules>({
    username: ruleUsername,
    password: rulePassword
});

onMounted(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
    const storedRememberPassword = localStorage.getItem('rememberPassword') === 'true';
    if (storedRememberPassword) {
        form.username = storedUsername || '';
        form.password = storedPassword || '';
        form.rememberPassword = true;
    }
});
const handleLogin = () => {
    if (formRef.value) {
        formRef.value.validate(async (valid: boolean) => {
            if (!valid) return
            if (!slideVerify.value.isVerified) {
                ElMessage.error('请做滑动验证')
                return
            }
            if (form.rememberPassword) {
                localStorage.setItem('username', form.username);
                localStorage.setItem('password', form.password);
                localStorage.setItem('rememberPassword', 'true');
            } else {
                localStorage.removeItem('username');
                localStorage.removeItem('password');
                localStorage.removeItem('rememberPassword');
            }
            const isLogin = await userStore.login(form.username, form.password)
            console.log(isLogin, 'isLoginisLoginisLogin', router)
            if (isLogin) {
                router.push('/')
                ElMessage.success('登录成功')
            } else {
                ElMessage.error('登录失败')
            }
        });
    }
};

</script>