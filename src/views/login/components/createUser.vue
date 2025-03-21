<template>
    <h2 class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
        创建一个账号 🚀
    </h2>
    <p class="text-muted-foreground py-3 lg:text-md text-sm text-muted-foreground">让您的应用程序管理变得简单</p>
    <el-form :model="form" ref="formRef" :rules="rules" class="login-form">
        <el-form-item class="pt-4" prop="username">
            <el-input size="large" placeholder="请输入用户名" v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input size="large" placeholder="请输入密码" v-model="form.password" type="password" show-password></el-input>
        </el-form-item>
        <el-form-item prop="confirmPassword">
            <el-input size="large" placeholder="请输入确认密码" v-model="form.confirmPassword" type="password"
                show-password></el-input>
        </el-form-item>
        <el-form-item>
            <el-button size="large" type="primary" class="w-full" @click="handleCreate">登录</el-button>
        </el-form-item>
        <el-form-item class="pt-1">
            <el-button size="large" class="w-full" @click="$emit('jumpTo', 'login')">返回</el-button>
        </el-form-item>
    </el-form>

</template>
<script setup lang="ts">
import { ElForm, ElMessage } from 'element-plus';
import { ref, onMounted, reactive } from 'vue';
import { LoginForm } from "../interface";
const form = reactive<LoginForm>({
    username: '',
    password: '',
    confirmPassword: ""
});
const emits = defineEmits(['jumpTo'])
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const slideVerify = ref();
const rules = reactive<FormFieldValidationRules>({
    username: [
        {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '用户名只能包含字母、数字和下划线',
            trigger: 'blur'
        },
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度最少 6 位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请输入确认密码', trigger: 'blur' },
        {
            min: 6, message: '确认密码长度最少 6 位', trigger: 'blur'
        },
        {
            validator: (reuld, valid, callback) => {
                if (form.password != valid) {
                    callback('两次输入的密码不一致')
                    return
                }
                callback()
            }
            , trigger: 'blur'
        }
    ]
});

onMounted(() => { });
const handleCreate = () => {
    if (formRef.value) {
        formRef.value.validate((valid: boolean) => {
            if (!valid) return
            emits('jumpTo', 'login')
            ElMessage.success('创建成功')
        });
    }
};

</script>