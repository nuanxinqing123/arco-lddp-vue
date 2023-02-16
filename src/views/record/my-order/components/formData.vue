<template>
  <a-col class="banner">
    <a-table :data="data">
      <template #columns>
        <a-table-column
          :title="$t('order.form.Creation.Time')"
          data-index="CreationTime"
        >
        </a-table-column>
        <a-table-column
          :title="$t('order.form.Order.Number')"
          data-index="OrderNumber"
        >
        </a-table-column>
        <a-table-column
          :title="$t('order.form.Pay.Amount')"
          data-index="PayAmount"
        >
        </a-table-column>
        <a-table-column
          :title="$t('order.form.Data')"
          data-index="Data"
        ></a-table-column>
        <a-table-column
          :title="$t('order.form.State')"
          data-index="State"
        ></a-table-column>
        <a-table-column :title="$t('order.form.Operate')">
          <template #cell>
            <a-button type="outline" @click="handleClick">
              <template #icon>
                <icon-unordered-list />
              </template>
              <template #default>{{ $t('order.form.Check.Order') }}</template>
            </a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
    <a-divider class="panel-border" />
  </a-col>
  <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
    <template #title>{{ $t('order.form.Order.Details') }}</template>
    <div>
      <p>{{ $t('order.form.Creation.Time') }}：2023-02-11 08:03:36</p>
      <p>{{ $t('order.form.Update.Time') }}：2023-02-11 20:51:24</p>
      <p>{{ $t('order.form.Order.Number') }}：1676073816121</p>
      <p>{{ $t('order.form.Pay.Amount') }}：1</p>
      <p>{{ $t('order.form.Data') }}：购买流量 100 G</p>
      <p>{{ $t('order.form.Order.Email') }}：bot@gmail.com</p>
    </div>
  </a-modal>
</template>

<script>
  import { reactive, ref } from 'vue';

  export default {
    setup() {
      const visible = ref(false);
      const handleClick = () => {
        visible.value = true;
      };
      const handleOk = () => {
        visible.value = false;
      };
      const handleCancel = () => {
        visible.value = false;
      };
      const columns = [
        {
          title: '创建时间',
          dataIndex: 'CreationTime',
        },
        {
          title: '订单编号',
          dataIndex: 'OrderNumber',
        },
        {
          title: '实付金额',
          dataIndex: 'PayAmount',
        },
        {
          title: '内容',
          dataIndex: 'Data',
        },
        {
          title: '状态',
          dataIndex: 'State',
        },
        {
          title: '操作',
          dataIndex: 'Operation',
        },
      ];
      const data = reactive([
        {
          key: '1',
          CreationTime: '2023-02-11 20:51:24',
          OrderNumber: 1676119884183,
          PayAmount: '1',
          Data: '购买流量 100 G',
          State: '已完成',
        },
        {
          key: '2',
          CreationTime: '2023-02-11 08:03:36',
          OrderNumber: 1676073816121,
          PayAmount: '1',
          Data: '购买流量 100 G',
          State: '已完成',
        },
        {
          key: '3',
          CreationTime: '2023-02-10 14:33:21',
          OrderNumber: 1676010801306,
          PayAmount: '1',
          Data: '购买流量 100 G',
          State: '已完成',
        },
        {
          key: '4',
          CreationTime: '2023-02-09 21:21:22',
          OrderNumber: 1675948882857,
          PayAmount: '1',
          Data: '购买流量 100 G',
          State: '已完成',
        },
        {
          key: '5',
          CreationTime: '2023-02-09 16:21:25',
          OrderNumber: 1675930885148,
          PayAmount: '1',
          Data: '购买流量 100 G',
          State: '已完成',
        },
      ]);

      return {
        columns,
        data,
        visible,
        handleClick,
        handleOk,
        handleCancel,
      };
    },
  };
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    padding: 20px 20px 0;
    background-color: var(--color-bg-2);
    border-radius: 4px 4px 0 0;
  }

  :deep(.arco-icon-home) {
    margin-right: 6px;
  }
</style>
