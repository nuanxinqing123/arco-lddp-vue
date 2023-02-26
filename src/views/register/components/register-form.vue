<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">注册 LDDP</div>
    <div class="login-form-error-msg">{{ errorMessage }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      class="login-form"
      layout="vertical"
    >
      <a-form-item
        field="email"
        :rules="[{ required: true, message: '邮箱不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.email" placeholder="邮箱">
          <template #prefix>
            <icon-email />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="user_key"
        :rules="[{ required: true, message: '密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.user_key"
          placeholder="密码"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button type="primary" html-type="submit" long @click="OpenCaptcha">
          注册账户
        </a-button>
        <a-button
          type="text"
          long
          class="login-form-register-btn"
          style="margin-bottom: 20px"
          @click="
            router.push({
              name: 'login',
            })
          "
        >
          返回登录
        </a-button>
      </a-space>
    </a-form>
  </div>

  <a-modal
    v-model:visible="visible"
    width="350px"
    title="请输入验证码，确保您不是机器人"
    @cancel="CloseCaptcha"
    @ok="CaptchaBeforeOk"
  >
    <a-form :model="userInfo" layout="vertical">
      <div style="text-align: center">
        <a-link @click="VCode">
          <div
            style="width: 200px; height: 64px"
            :style="{ backgroundImage: 'url(' + verificationCode.bs64 + ')' }"
          ></div>
        </a-link>
      </div>
      <a-divider />
      <a-form-item
        field="capt"
        label="验证码"
        :rules="[{ required: true, message: '验证码不能为空' }]"
        :validate-trigger="['change', 'blur']"
      >
        <a-input v-model="userInfo.capt" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { getVerificationCode, register } from '@/api/user';
  import { useRouter } from 'vue-router';
  import CryptoJS from 'crypto-js';

  const router = useRouter();
  const errorMessage = ref('');

  // 用户登录信息
  const userInfo = reactive({
    email: '',
    user_key: '',
    id: '',
    capt: '',
    is_save: false,
  });
  // 验证码信息
  const verificationCode = reactive({
    id: '',
    bs64: '',
  });
  // 验证码弹窗开关
  const visible = ref(false);

  // 获取验证码配置信息
  const VCode = () => {
    getVerificationCode().then((res) => {
      verificationCode.id = res.data.id;
      verificationCode.bs64 = res.data.bs64;
    });
  };
  VCode();

  // 打开验证码弹窗
  const OpenCaptcha = () => {
    visible.value = true;
  };
  // 关闭验证码弹窗
  const CloseCaptcha = () => {
    visible.value = false;
  };
  // 验证码弹窗确认
  const CaptchaBeforeOk = () => {
    const registerInfo = {
      email: userInfo.email,
      // eslint-disable-next-line no-use-before-define
      user_key: MD5(userInfo.user_key),
      id: verificationCode.id,
      capt: userInfo.capt,
    };
    // 开始登录
    register(registerInfo)
      .then((res) => {
        // 注册成功
        if (res.code === 2000) {
          Message.success('注册成功');
          router.push({
            name: 'login',
          });
        }
      })
      .catch(() => {
        // 关闭验证码弹窗
        visible.value = false;
        // 清空输入框
        userInfo.capt = '';
        // 重置验证码
        VCode();
      });
  };
  const MD5 = (str: string) => {
    return CryptoJS.MD5(str).toString();
  };
</script>

<style lang="less" scoped>
  .login-form {
    &-wrapper {
      width: 320px;
    }

    &-title {
      color: var(--color-text-1);
      font-weight: 500;
      font-size: 24px;
      line-height: 32px;
    }

    &-sub-title {
      color: var(--color-text-3);
      font-size: 16px;
      line-height: 24px;
    }

    &-error-msg {
      height: 32px;
      color: rgb(var(--red-6));
      line-height: 32px;
    }

    &-password-actions {
      display: flex;
      justify-content: space-between;
    }

    &-register-btn {
      color: var(--color-text-3) !important;
    }
  }
</style>
