import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Message, Modal } from '@arco-design/web-vue';
import { useUserStore } from '@/store';
import { getToken } from '@/utils/auth';

export interface HttpResponse<T = unknown> {
  status: number;
  msg: string;
  code: number;
  data: T;
}

if (import.meta.env.VITE_API_BASE_URL) {
  axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL;
}

// 封装请求Token
axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = getToken();
    if (token) {
      if (!config.headers) {
        config.headers = {};
      }
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // do something
    return Promise.reject(error);
  }
);

// add response interceptors
axios.interceptors.response.use(
  (response: AxiosResponse<HttpResponse>) => {
    const res = response.data;

    // @ts-ignore
    if (response.config.isDownload) {
      return res;
    }

    // 登录环境异常
    if (res.code === 5014) {
      Message.warning({
        content: res.msg || 'Warning',
        duration: 3 * 1000,
      });
      return res;
    }

    // 如果返回代码不是2000，则判断为错误。
    if (res.code !== 2000) {
      Message.error({
        content: res.msg || 'Error',
        duration: 3 * 1000,
      });

      // 封装错误处理
      if ([5003].includes(res.code)) {
        Modal.warning({
          width: 350,
          title: '状态失效',
          content: '您的登录状态已失效，您可以取消以保留此页面，或再次登录',
          okText: '重新登录',
          async onOk() {
            const userStore = useUserStore();

            await userStore.logout();
            window.location.reload();
          },
        });
      }
      // return Promise.reject(new Error(res.msg || 'Error'));
    }
    return res;
  },
  (error) => {
    Message.error({
      content: error.msg || 'Request Error',
      duration: 3 * 1000,
    });
    return Promise.reject(error);
  }
);
