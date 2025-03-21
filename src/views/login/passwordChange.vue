<template>
    <div class="flex justify-center items-center h-full">
        <div class="p-8 rounded w-full max-w-md">
            <h2 class="text-2xl pb-4 text-center">修改密码</h2>
            <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
                <el-form-item label="原密码" prop="oldPassword">
                    <el-input v-model="form.oldPassword" placeholder="请输入原密码" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                    <el-input v-model="form.newPassword" placeholder="请输入新密码" type="password" />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword">
                    <el-input v-model="form.confirmPassword" placeholder="请再次输入新密码" type="password" />
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                    <el-button @click="resetForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElForm, ElFormItem, ElInput, ElButton } from 'element-plus';

// 定义表单数据
const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
});

// 定义表单引用
const formRef = ref<InstanceType<typeof ElForm>>();

// 定义表单验证规则
const rules = {
    oldPassword: [
        { required: true, message: '请输入原密码', trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: '请输入新密码', trigger: 'blur' },
        { min: 6, message: '密码长度不能少于 6 位', trigger: 'blur' }
    ],
    confirmPassword: [
        { required: true, message: '请再次输入新密码', trigger: 'blur' },
        {
            validator: (rule: any, value: string, callback: any) => {
                if (value !== form.value.newPassword) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            },
            trigger: 'blur'
        }
    ]
};

// 提交表单方法
const submitForm = () => {
    formRef.value?.validate((valid: boolean) => {
        if (valid) {
            // 这里可以添加提交表单的逻辑，例如发送请求到后端
            console.log('表单提交成功', form.value);
        } else {
            console.log('表单验证失败');
        }
    });
};

// 重置表单方法
const resetForm = () => {
    formRef.value?.resetFields();
};
</script>

<style scoped>
/* 可以在这里添加自定义的 Tailwind CSS 类 */
</style>