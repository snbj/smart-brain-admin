export const ruleUsername: ValidationRule[] = [
    {
        pattern: /^[a-zA-Z0-9_]+$/,
        message: '用户名只能包含字母、数字和下划线',
        trigger: 'blur'
    },
    { required: true, message: '请输入用户名', trigger: 'blur' }
]
export const rulePassword: ValidationRule[] = [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度最少 6 位', trigger: 'blur' }
]
export const ruleEmail: ValidationRule[] = [
    {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: '请输入有效的邮箱地址',
        trigger: 'blur'
    },
    { required: true, message: '请输入邮箱', trigger: 'blur' }
]