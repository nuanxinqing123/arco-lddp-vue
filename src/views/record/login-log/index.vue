<template>
  <div class="container">
    <Breadcrumb :items="['记录', '登录日志']" />
    <div class="left-side" style="margin-top: 12px">
      <div class="panel">
        <form-data />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import FormData from './components/formData.vue';
</script>

<script lang="ts">
  export default {
    name: 'Task',
  };
</script>

<style lang="less" scoped>
  .container {
    margin-bottom: 20px;
    padding: 0 20px 20px;
  }

  .left-side {
    flex: 1;
    overflow: auto;
  }

  .right-side {
    width: 280px;
    margin-left: 16px;
  }

  .panel {
    padding: 10px;
    overflow: auto;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }

  .moduler-wrap {
    background-color: var(--color-bg-2);
    border-radius: 4px;

    :deep(.text) {
      color: rgb(var(--gray-8));
      font-size: 12px;
      text-align: center;
    }

    :deep(.wrapper) {
      margin-bottom: 8px;
      text-align: center;
      cursor: pointer;

      &:last-child {
        .text {
          margin-bottom: 0;
        }
      }

      &:hover {
        .icon {
          color: rgb(var(--arcoblue-6));
          background-color: #e8f3ff;
        }

        .text {
          color: rgb(var(--arcoblue-6));
        }
      }
    }

    :deep(.icon) {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-bottom: 4px;
      color: rgb(var(--dark-gray-1));
      font-size: 16px;
      line-height: 32px;
      text-align: center;
      background-color: rgb(var(--gray-1));
      border-radius: 4px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }

    .right-side {
      // display: none;
      width: 100%;
      margin-top: 16px;
      margin-left: 0;
    }
  }
</style>
