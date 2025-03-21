interface ValidationRule {
    pattern?: RegExp;
    message?: string;
    trigger: string;
    required?: boolean;
    min?: number;
    validator?: ((
        val: unknown,
        value: any,
        callback: (error?: string | Error | undefined) => void
    ) => any) | undefined;
}

interface FormFieldValidationRules {
    [field: string]: ValidationRule[];
}
