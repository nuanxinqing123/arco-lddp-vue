<template>
  <div class="login-form-wrapper">
    <div class="login-form-title">找回 LDDP 密码</div>
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
      <a-space :size="16" direction="vertical" style="padding-bottom: 12px">
        <a-button type="primary" html-type="submit" long @click="OpenCaptcha">
          发送验证码
        </a-button>
      </a-space>
      <a-form-item
        field="email"
        :rules="[{ required: true, message: '验证码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input v-model="userInfo.code" placeholder="邮箱验证码">
          <template #prefix>
            <icon-email />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="user_key"
        :rules="[{ required: true, message: '新密码不能为空' }]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.user_key"
          placeholder="新密码(请不要使用弱口令密码)"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <a-button
          type="primary"
          html-type="submit"
          long
          :disabled="disabled"
          @click="Submit"
        >
          修改密码
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
  import { getVerificationCode, sendFindPwdCode, sendUpPwd } from '@/api/user';
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
    code: '',
  });
  // 验证码信息
  const verificationCode = reactive({
    id: '',
    bs64: '',
  });
  // 验证码弹窗开关
  const visible = ref(false);
  // 按钮禁用弃用
  const disabled = ref(true);

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
    // 发送邮箱验证码
    const sendEmailCode = {
      email: userInfo.email,
      id: verificationCode.id,
      capt: userInfo.capt,
    };

    sendFindPwdCode(sendEmailCode).then((res) => {
      if (res.code === 2000) {
        Message.success('发送成功');
        visible.value = false;
        disabled.value = false;
      } else {
        userInfo.capt = '';
      }
    });
  };
  // 发送密码修改请求
  const Submit = () => {
    const data = {
      email: userInfo.email,
      // eslint-disable-next-line no-use-before-define
      user_key: MD5(userInfo.user_key),
      code: userInfo.code,
    };
    sendUpPwd(data).then((res) => {
      if (res.code === 2000) {
        Message.success('修改成功');
        router.push({
          name: 'login',
        });
      }
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
