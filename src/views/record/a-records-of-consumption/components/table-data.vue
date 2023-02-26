<template>
  <a-button type="outline" @click="handleClick">
    <template #icon>
      <icon-search />
    </template>
    <template #default>搜索</template>
  </a-button>
  &ensp;
  <a-button type="outline" status="success" @click="handleClickRefresh">
    <template #icon>
      <icon-refresh />
    </template>
    <template #default>重置</template>
  </a-button>
  <a-drawer
    :width="500"
    :visible="visible"
    unmount-on-close
    ok-text="检索"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 消费记录搜索 </template>
    <div>
      <a-form :model="search" layout="vertical">
        <a-form-item field="email" label="检索内容">
          <a-select placeholder="选择检索项" @change="handleClickSearchChange">
            <a-option>订单号</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="points" label="欲检索内容">
          <a-input v-model="search.data" placeholder="值（支持模糊搜索）" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
  <a-divider />

  <a-table :pagination="false" :data="data.table">
    <template #columns>
      <a-table-column title="# 订单号" data-index="vote_order">
      </a-table-column>
      <a-table-column title="用户UID" data-index="user_id"> </a-table-column>
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
      <a-table-column title="行为时间" data-index="CreatedAt"> </a-table-column>
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
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import { consumptionDataSearch, getAdminConsumptionList } from '@/api/record';
  import moment from 'moment/moment';
  import { Message } from '@arco-design/web-vue';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const data = reactive({
    table: [],
  });
  const search = reactive({
    fc: '',
    data: '',
  });
  const visible = ref(false);

  const getConsumptionLog = async (page: number) => {
    await getAdminConsumptionList(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getConsumptionLog(basePagination.current);
  const handleClick = () => {
    visible.value = true;
  };
  const handleClickSearchChange = (fc: any) => {
    search.fc = fc;
  };
  const handleOk = () => {
    if (!search.fc) {
      Message.error('检索方法不能为空');
      return;
    }
    if (!search.data) {
      Message.error('检索值不能为空');
      return;
    }

    consumptionDataSearch(search).then((res) => {
      if (res.code === 2000) {
        Message.success('检索成功');
        search.data = '';
        data.table = res.data;
        data.table.forEach((item) => {
          item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
        });
      }
    });
    basePagination.current = 1;
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
  const handleClickRefresh = () => {
    getConsumptionLog(1);
  };
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
