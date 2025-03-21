declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}

// 手动声明 ImportMeta.glob
interface ImportMeta {
    glob(pattern: Array, pattern: Object): Record<string, () => Promise<any>>;
    globEager(pattern: string): Record<string, any>;
}
interface ImportMetaEnv {
    VITE_APP_BASE_API: string;
    // 可以添加更多自定义的环境变量
    // 例如：
    // VITE_ANOTHER_VARIABLE: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}