import { App, createVNode, render } from 'vue'
import SmartLoadingComponents from '@/components/loading/index.vue';

let container: any;

const SmartLoading = {
    install(app: App) {
        app.config.globalProperties.$showLoging = (title?: string) => {
            const vnode = createVNode(SmartLoadingComponents, {
                title
            })
            container = document.createElement('dev')
            render(vnode, container)
            document.body.appendChild(container)


        };
        app.config.globalProperties.$hideLoging = () => {
            if (!container) return
            render(null, container);
            document.body.removeChild(container);
            container = ""
        }
    }
}

export default SmartLoading