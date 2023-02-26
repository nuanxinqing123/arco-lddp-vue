<template>
  <a-table :pagination="false" :data="rechargeLog.table" :scroll="scroll">
    <template #columns>
      <a-table-column title="# 创建时间" data-index="CreatedAt">
      </a-table-column>
      <a-table-column title="充值卡密" data-index="recharge_tickets">
      </a-table-column>
      <a-table-column title="充值点券" data-index="recharge_points">
      </a-table-column>
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
    @change="getRechargeRecord"
  />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Pagination } from '@/types/global';
  import moment from 'moment';
  import { getRechargeList } from '@/api/record';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const scroll = {
    x: 1050,
  };
  const rechargeLog = reactive({
    table: [],
  });

  // 获取用户充值记录
  const getRechargeRecord = async (page: number) => {
    await getRechargeList(page).then((res) => {
      basePagination.current = res.data.page;
      rechargeLog.table = res.data.page_data;
      rechargeLog.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getRechargeRecord(basePagination.current);
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
