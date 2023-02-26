<template>
  <a-alert title="任务公告">
    <div id="notice"></div>
  </a-alert>
</template>

<script lang="ts" setup>
  // 获取任务公告
  import { getTaskNotice } from '@/api/task';

  const getNotice = () => {
    getTaskNotice().then((res) => {
      document.getElementById('notice')!.innerHTML = res.data.value;
    });
  };
  getNotice();
</script>

<style scoped></style>
