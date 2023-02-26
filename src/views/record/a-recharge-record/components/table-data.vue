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
    <template #title> 用户编辑 </template>
    <div>
      <a-form :model="search" layout="vertical">
        <a-form-item field="email" label="检索内容">
          <a-select placeholder="选择检索项" @change="handleClickSearchChange">
            <a-option>卡密值</a-option>
            <a-option>用户UID</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="points" label="欲检索内容">
          <a-input v-model="search.data" placeholder="值（支持模糊搜索）" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
  <a-divider />

  <a-table :pagination="false" :columns="columns" :data="data.table">
    <template #tickets_key_state="{ record }">
      <span v-if="record.tickets_key_state === true">
        <a-tag bordered color="green">未使用</a-tag>
      </span>
      <span v-else>
        <a-tag bordered color="red">已使用</a-tag>
      </span>
    </template>
    <template #optional="{ record }">
      <a-button type="text" status="danger" @click="handleClick(record)">
        <template #icon>
          <icon-delete />
        </template>
        <template #default>删除</template>
      </a-button>
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
    @change="getRechargeDataList"
  />
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Pagination } from '@/types/global';
  import { getAdminRechargeList, rechargeDataSearch } from '@/api/record';
  import moment from 'moment/moment';
  import { Message } from '@arco-design/web-vue';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const search = reactive({
    fc: '',
    data: '',
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: '用户UID',
      dataIndex: 'recharge_uid',
    },
    {
      title: '卡密值',
      dataIndex: 'recharge_tickets',
    },
    {
      title: '充值额度',
      dataIndex: 'recharge_points',
    },
    {
      title: '充值者IP',
      dataIndex: 'recharge_ip',
    },
    {
      title: '充值时间',
      dataIndex: 'CreatedAt',
    },
  ];
  const data = reactive({
    table: [],
  });
  const visible = ref(false);

  const getRechargeDataList = async (page: number) => {
    await getAdminRechargeList(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getRechargeDataList(basePagination.current);
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

    rechargeDataSearch(search).then((res) => {
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
    getRechargeDataList(1);
  };
</script>
