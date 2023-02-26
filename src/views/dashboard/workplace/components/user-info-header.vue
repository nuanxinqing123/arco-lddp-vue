<template>
  <div class="header">
    <a-space :size="12" direction="vertical" align="center">
      <a-avatar :size="64">
        <img
          src="https://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png"
          alt="avatar"
        />
      </a-avatar>
      <a-typography-title :heading="6" style="margin: 0">
        {{ userInfo.email }}
      </a-typography-title>
      <div class="user-msg">
        <a-space :size="18">
          <div>
            <icon-home />
            <a-typography-text> 前端开发工程师 </a-typography-text>
          </div>
          <div>
            <icon-location />
            <a-typography-text>北京</a-typography-text>
          </div>
        </a-space>
      </div>
    </a-space>
  </div>
</template>

<script lang="ts" setup>
  import { useUserStore } from '@/store';

  const userInfo = useUserStore();
</script>

<style scoped lang="less">
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 204px;
    color: var(--gray-10);
    background: url(https://pic.6b7.xyz/2023/02/25/4d31d1c667309.jpg) no-repeat;
    background-size: cover;
    border-radius: 4px;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }

    .user-msg {
      .arco-icon {
        color: rgb(var(--gray-10));
      }

      .arco-typography {
        margin-left: 6px;
      }
    }
  }
</style>
