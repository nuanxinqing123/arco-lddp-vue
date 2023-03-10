<template>
  <a-collapse>
    <span v-for="d in orderData.table" :key="d">
      <a-collapse-item :key="d['ID']" :header="'创建时间：' + d['CreatedAt']">
        <template #extra>
          <a-link
            v-if="d['order_state'] === -1"
            size="mini"
            style="color: #165dff"
            >等待中</a-link
          >
          <a-link
            v-else-if="d['order_state'] === 0"
            size="mini"
            style="color: #165dff"
            >进行中</a-link
          >
          <a-link
            v-else-if="d['order_state'] === 3"
            size="mini"
            style="color: #165dff"
            >退款中</a-link
          >
          <a-link
            v-else-if="d['order_state'] === 1"
            size="mini"
            style="color: #bedaff"
            >已完成</a-link
          >
          <a-link
            v-else-if="d['order_state'] === 2"
            size="mini"
            style="color: #bedaff"
            >已终止</a-link
          >
          <a-link v-else size="mini" style="color: #bedaff">已退款</a-link>
        </template>
        <div style="color: #86909c">
          <div>创建时间：{{ d['CreatedAt'] }}</div>
          <div>更新时间：{{ d['UpdatedAt'] }}</div>
          <div>订单类型：{{ d['order_task_type'] }}</div>
          <div>消费点券：{{ d['order_tickets'] }}&ensp;点券</div>
          <div>任务数量：{{ d['order_number'] }}</div>
          <div>任务变量：{{ d['order_variable'] }}</div>
          <div
            >订单状态：
            <span v-if="d['order_state'] === -1">等待中</span>
            <span v-else-if="d['order_state'] === 0">进行中</span>
            <span v-else-if="d['order_state'] === 1">已完成</span>
            <span v-else-if="d['order_state'] === 2">已终止</span>
            <span v-else-if="d['order_state'] === 3">退款中</span>
            <span v-else>已退款</span>
          </div>
          <div
            >订单实况：
            <span v-if="d['order_status'] !== ''">{{ d['order_status'] }}</span>
            <span v-else>&ensp;Loading</span>
          </div>
          <div>订单备注：{{ d['order_state_reason'] }}</div>
          <div>任务备注：{{ d['order_remarks'] }}</div>
        </div>
        <div>
          <a-button
            v-if="d['order_state'] === -1 || d['order_state'] === 0"
            style="
              float: right;
              margin-top: 10px;
              margin-right: 20px;
              margin-bottom: 10px;
            "
            shape="round"
            type="primary"
            size="small"
            @click="handleClick(d['order_id'])"
            >退单</a-button
          >
          <a-button
            v-else
            style="
              float: right;
              margin-top: 10px;
              margin-right: 20px;
              margin-bottom: 10px;
            "
            shape="round"
            type="primary"
            size="small"
            disabled
            >退单</a-button
          >
        </div>
      </a-collapse-item>
    </span>
  </a-collapse>
  <a-pagination
    style="
      float: right;
      margin-top: 10px;
      margin-right: 20px;
      margin-bottom: 10px;
    "
    :total="basePagination.current * 10"
    simple
    @change="getUserOrderList"
  />
  <a-modal
    v-model:visible="visible"
    width="354px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 确认退款此订单？ </template>
    <div>订单编号：{{ orderNumber.order_id }}</div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { getOrderList, refundOrder } from '@/api/record';
  import { Pagination } from '@/types/global';
  import moment from 'moment/moment';
  import { Message } from '@arco-design/web-vue';

  const visible = ref(false);
  const orderNumber = reactive({
    order_id: '',
  });
  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const orderData = reactive({
    table: [],
  });

  const getUserOrderList = async (page: number) => {
    await getOrderList(page).then((res) => {
      basePagination.current = res.data.page;
      orderData.table = res.data.page_data;
      orderData.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
        item.UpdatedAt = moment(item.UpdatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getUserOrderList(basePagination.current);

  const handleClick = (order: string) => {
    orderNumber.order_id = order;
    visible.value = true;
  };
  const handleOk = () => {
    refundOrder(orderNumber.order_id).then((res) => {
      if (res.code === 2000) {
        Message.success('已申请退单');
        getUserOrderList(basePagination.current);
      }
    });
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
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
