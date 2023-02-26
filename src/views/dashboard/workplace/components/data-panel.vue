<template>
  <a-grid :cols="24" :row-gap="16" class="panel">
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-statistic
          title="今日订单数"
          :value="userInfo.to_day_order"
          :value-from="0"
          animation
          show-group-separator
        >
          <template #suffix>
            <span class="unit">个</span>
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-statistic
          title="昨日订单数"
          :value="userInfo.yes_day_order"
          :value-from="0"
          animation
          show-group-separator
        >
          <template #suffix>
            <span class="unit">个</span>
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item
      class="panel-col"
      :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 12, xxl: 6 }"
    >
      <a-space>
        <a-statistic
          title="较昨日新增"
          :value="
            ((userInfo.to_day_order - userInfo.yes_day_order) /
              userInfo.yes_day_order) *
            100
          "
          :precision="1"
          :value-from="0"
          animation
        >
          <template #suffix> % </template>
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
          title="余额（点券）"
          :value="userInfo.points"
          :value-from="0"
          animation
          show-group-separator
        >
          <template #suffix>
            <a-space>
              <a-link class="unit" @click="handleClick">充值</a-link>
            </a-space>
          </template>
        </a-statistic>
      </a-space>
    </a-grid-item>
    <a-grid-item :span="24">
      <a-divider class="panel-border" />
    </a-grid-item>
  </a-grid>
  <a-modal
    v-model:visible="visible"
    width="354px"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 点券充值 </template>
    <div>
      <a-form :model="UserRecharge" layout="horizontal">
        <a-form-item
          field="name"
          label="充值卡"
          :rules="[{ required: true, message: '卡密不能为空' }]"
          :validate-trigger="['change', 'blur']"
          hide-label
        >
          <a-input
            v-model="UserRecharge.recharge_tickets"
            placeholder="请输入充值卡密"
          />
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { useUserStore } from '@/store';
  import { userRecharge } from '@/api/user';
  import { Message } from '@arco-design/web-vue';

  const userInfo = useUserStore();

  const visible = ref(false);

  const UserRecharge = reactive({
    recharge_tickets: '',
  });

  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    if (!UserRecharge.recharge_tickets) {
      Message.error('卡密不能为空');
      return;
    }

    // 发送充值请求
    userRecharge(UserRecharge).then((res) => {
      if (res.code === 2000) {
        Message.success(res.data);
        UserRecharge.recharge_tickets = '';
        visible.value = false;
        // 更新用户信息
        userInfo.info();
      }
    });
  };
  const handleCancel = () => {
    visible.value = false;
  };
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
