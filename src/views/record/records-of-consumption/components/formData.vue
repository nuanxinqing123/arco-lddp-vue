<template>
  <a-table :pagination="false" :data="consumption.table" :scroll="scroll">
    <template #columns>
      <a-table-column title="# 订单号" data-index="vote_order">
      </a-table-column>
      <a-table-column title="类型" data-index="task_state">
        <template #cell="scope">
          <span v-if="scope.record.task_state === '消费'">
            <a-tag bordered color="blue">消费</a-tag>
          </span>
          <span v-else><a-tag bordered color="orange">退款</a-tag></span>
        </template>
      </a-table-column>
      <a-table-column
        title="消费点券"
        data-index="vote_tickets"
      ></a-table-column>
      <a-table-column title="创建时间" data-index="CreatedAt"> </a-table-column>
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
    @change="getConsumptionLog"
  />
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { Pagination } from '@/types/global';
  import { getConsumptionList } from '@/api/record';
  import moment from 'moment/moment';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const scroll = {
    x: 1050,
  };
  const consumption = reactive({
    table: [],
  });

  const getConsumptionLog = async (page: number) => {
    await getConsumptionList(page).then((res) => {
      basePagination.current = res.data.page;
      consumption.table = res.data.page_data;
      consumption.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getConsumptionLog(basePagination.current);
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
