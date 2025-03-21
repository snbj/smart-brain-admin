<template>
    <h2 class="text-foreground mb-3 text-3xl font-bold leading-9 tracking-tight lg:text-4xl">
        忘记密码? 🤦🏻‍♂️
    </h2>
    <p class="text-muted-foreground py-3 lg:text-md text-sm text-muted-foreground">输入您的电子邮件，我们将向您发送重置密码的连接</p>
    <el-form :model="form" ref="formRef" :rules="rules" class="login-form">
        <el-form-item class="pt-4" prop="email">
            <el-input size="large" placeholder="请输入邮箱" v-model="form.email"></el-input>
        </el-form-item>

        <el-form-item class="pt-1">
            <el-button size="large" type="primary" class="w-full" @click="onEmail">发送重置链接</el-button>
        </el-form-item>
        <el-form-item class="pt-1">
            <el-button size="large" class="w-full" @click="$emit('jumpTo', 'login')">返回</el-button>
        </el-form-item>
    </el-form>
</template>
<script setup lang="ts">
import { ref, reactive } from "vue"
import { FormEmail } from "../interface";
import { ruleEmail } from "@/utils/validte"
import { ElForm, ElMessage } from 'element-plus';

const emits = defineEmits(['jumpTo'])
const form = reactive<FormEmail>({
    email: ""
})
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const rules = reactive<FormFieldValidationRules>({
    email: ruleEmail as ValidationRule[]
})

const onEmail = function () {
    formRef?.value?.validate((valid) => {
        if (!valid) return
        ElMessage.success('登录成功')
        emits('jumpTo', 'login')
    })
}
</script>