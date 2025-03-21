import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { useUserStore } from "@/store/modules/user"
import router from '@/router/index';

// 创建 Axios 实例

const service: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 从环境变量中获取基础 API 地址
    timeout: 5000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 在发送请求之前做些什么，例如添加请求头
        const token = useUserStore().accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        // 处理请求错误
        console.error('请求错误:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        // 对响应数据做点什么
        const res = response.data;
        if (res.code == 401) {
            handleUserExpired()
            return
        } else if (res.code !== 200) {
            // 处理业务错误
            console.error('业务错误:', res);
            return Promise.reject(res);
        } else {
            return res;
        }
    },
    (error) => {
        // 处理响应错误
        console.error('响应错误:', error.message);
        return Promise.reject(error);
    }
);

function handleUserExpired() {
    useUserStore().logout();
    router.push('/login');


}

// 封装请求方法
const request = {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.get(url, config).then((res) => res.data);
    },
    post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config).then((res) => res.data);
    },
    put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return service.put(url, data, config).then((res) => res.data);
    },
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return service.delete(url, config).then((res) => res.data);
    }
};

export default request;