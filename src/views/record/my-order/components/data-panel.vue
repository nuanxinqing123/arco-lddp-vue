<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-statistic
          title="今日订单"
          :value="orderData.order_today"
          :value-from="0"
          animation
          show-group-separator
        >
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      style="border-right: none"
    >
      <a-space>
        <a-statistic
          title="7日订单"
          :value="orderData.order_seven"
          :value-from="0"
          animation
          show-group-separator
        >
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-statistic
          title="30日订单"
          :value="orderData.order_thirty"
          :value-from="0"
          animation
          show-group-separator
        >
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
      style="border-right: none"
    >
      <a-space>
        <a-statistic
          title="总订单"
          :value="orderData.order_total"
          :value-from="0"
          animation
          show-group-separator
        >
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item :span="24">
      <a-divider class="panel-border" />
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { getUserOrderData } from '@/api/record';

  const orderData = reactive({
    order_today: 0,
    order_seven: 0,
    order_thirty: 0,
    order_total: 0,
  });

  // 获取用户订单数据
  const getOrderData = async () => {
    await getUserOrderData().then((res) => {
      orderData.order_today = res.data.order_today;
      orderData.order_seven = res.data.order_seven;
      orderData.order_thirty = res.data.order_thirty;
      orderData.order_total = res.data.order_total;
    });
  };
  getOrderData();
</script>

<style lang="less" scoped>
  .arco-grid.panel {
    margin-bottom: 0;
    padding: 16px 20px 0;
  }

  .panel-col {
    padding-left: 43px;
    border-right: 1px solid rgb(var(--gray-2));
  }

  .col-avatar {
    margin-right: 12px;
    background-color: var(--color-fill-2);
  }

  .up-icon {
    color: rgb(var(--red-6));
  }

  .unit {
    margin-left: 8px;
    color: rgb(var(--gray-8));
    font-size: 12px;
  }

  :deep(.panel-border) {
    margin: 4px 0 0;
  }
</style>
