
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import infoMsg from './info'
import { visualizer } from "rollup-plugin-visualizer";
import svgoPlugin from 'vite-plugin-svgo';
import viteCompression from 'vite-plugin-compression';
import { vitePluginFakeServer } from "vite-plugin-fake-server";
import vitePluginRemoveConsole from 'vite-plugin-remove-console';
import eslintPlugin from 'vite-plugin-eslint';

export default function getPluginsList() {
    const isDiv = process.env.NODE_ENV == 'development'
    let plugins = [
        vue(),
        isDiv && vueDevTools(),
        svgLoader(),
        tailwindcss(),
        svgoPlugin({
            // svgo 配置选项
            plugins: [
                { name: 'preset-default' },
                { name: 'removeViewBox', active: false }
            ]
        }),
        visualizer({ open: true, gzipSize: true, brotliSize: true, filename: "./public/report.html" }),
        infoMsg,
        viteCompression({
            verbose: true, // 是否在控制台输出压缩结果
            disable: false, // 是否禁用压缩
            threshold: 10240, // 只有大小大于该值的文件才会被压缩，单位是字节，这里是 10KB
            algorithm: 'gzip', // 压缩算法，可选 'gzip', 'brotliCompress' 等
            ext: '.gz' // 生成的压缩文件扩展名
        }),
        vitePluginFakeServer({
            baseURL: '/api',
            logger: true, // 是否在控制台输出日志
            enableProd: isDiv,
            infixName: false,
            include: "mock",
        })
    ]
    if (isDiv) {
        plugins.push(vitePluginRemoveConsole({}))
    }
    return plugins
}