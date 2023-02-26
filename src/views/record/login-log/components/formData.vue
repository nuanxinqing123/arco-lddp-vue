<template>
  <a-table :pagination="false" :data="loginLog.table" :scroll="scroll">
    <template #columns>
      <a-table-column title="# 登录时间" data-index="CreatedAt">
      </a-table-column>
      <a-table-column title="IP地址" data-index="ip"></a-table-column>
      <a-table-column title="物理地址" data-index="ip_addr"> </a-table-column>
      <a-table-column
        title="登录方式"
        data-index="login_function"
      ></a-table-column>
    </template>
  </a-table>
  <a-pagination
    style="
      float: right;
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 10px;
    "
    :total="basePagination.current * 10"
    simple
    @change="getLoginLog"
  />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Pagination } from '@/types/global';
  import { getLoginIpList } from '@/api/record';
  import moment from 'moment';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const scroll = {
    x: 1050,
  };
  const loginLog = reactive({
    table: [],
  });

  // 获取用户登录数据
  const getLoginLog = async (page: number) => {
    await getLoginIpList(page).then((res) => {
      basePagination.current = res.data.page;
      loginLog.table = res.data.page_data;
      loginLog.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getLoginLog(basePagination.current);
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 10px 10px 0;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
</style>
