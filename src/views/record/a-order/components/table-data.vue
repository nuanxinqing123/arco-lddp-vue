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
    <template #title> 订单搜索 </template>
    <div>
      <a-form :model="search" layout="vertical">
        <a-form-item field="email" label="检索内容">
          <a-select placeholder="选择检索项" @change="handleClickSearchChange">
            <a-option>订单类名</a-option>
            <a-option>订单号</a-option>
            <a-option>订单任务变量</a-option>
          </a-select>
        </a-form-item>
        <a-form-item v-show="visibleState" field="state" label="检索状态">
          <a-select
            placeholder="选择检索项"
            @change="handleClickSearchStateChange"
          >
            <a-option>等待中</a-option>
            <a-option>进行中</a-option>
            <a-option>已完成</a-option>
            <a-option>已终止</a-option>
            <a-option>退款中</a-option>
            <a-option>已退款</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="points" label="欲检索内容">
          <a-input v-model="search.data" placeholder="值（支持模糊搜索）" />
        </a-form-item>
      </a-form>
      <div>
        <p>
          检索内容为「订单类名」时，欲检索内容应该填写需要检索的「订单类型」
        </p>
        <p> 检索内容为「订单号」时，欲检索内容应该填写需要检索的「订单号」 </p>
        <p>
          检索内容为「订单任务变量」时，欲检索内容应该填写需要检索的「订单内的任务变量值」
        </p>
      </div>
    </div>
  </a-drawer>
  <a-divider />
  <a-table :pagination="false" :columns="columns" :data="data.table">
    <template #order_state="{ record }">
      <span v-if="record.order_state === -1">
        <a-tag bordered color="green">等待中</a-tag>
      </span>
      <span v-else-if="record.order_state === 0">
        <a-tag bordered color="green">进行中</a-tag>
      </span>
      <span v-else-if="record.order_state === 3">
        <a-tag bordered color="green">退款中</a-tag>
      </span>
      <span v-else-if="record.order_state === 1">
        <a-tag bordered color="gray">已完成</a-tag>
      </span>
      <span v-else-if="record.order_state === 2">
        <a-tag bordered color="gray">已终止</a-tag>
      </span>
      <span v-else>
        <a-tag bordered color="gray">已退款</a-tag>
      </span>
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
    @change="getOrderData"
  />
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import moment from 'moment/moment';
  import { getOrderDataList, orderDataSearch } from '@/api/record';
  import { Message } from '@arco-design/web-vue';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: '订单类名',
      dataIndex: 'order_task_type',
    },
    {
      title: '订单号',
      dataIndex: 'order_id',
    },
    {
      title: '订单归属用户',
      dataIndex: 'order_uid',
    },
    {
      title: '订单任务数量',
      dataIndex: 'order_number',
    },
    {
      title: '订单状态',
      dataIndex: 'order_state',
      slotName: 'order_state',
    },
    {
      title: '下单IP',
      dataIndex: 'order_ip',
    },
    {
      title: '下单时间',
      dataIndex: 'CreatedAt',
    },
  ];
  const data = reactive({
    table: [],
  });
  const search = reactive({
    fc: '',
    state: '',
    data: '',
  });
  const visible = ref(false);
  const visibleState = ref(false);

  const getOrderData = async (page: number) => {
    await getOrderDataList(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getOrderData(basePagination.current);
  const handleClick = () => {
    visible.value = true;
  };
  const handleClickSearchChange = (fc: any) => {
    search.fc = fc;
    visibleState.value = fc === '订单类名';
  };
  const handleClickSearchStateChange = (fc: any) => {
    search.state = fc;
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

    orderDataSearch(search).then((res) => {
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
    getOrderData(1);
  };
</script>
