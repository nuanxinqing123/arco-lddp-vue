<template>
  <a-button type="outline" @click="handleClickAdd">
    <template #icon>
      <icon-plus />
    </template>
    <template #default>添加</template>
  </a-button>
  &ensp;
  <a-button type="outline" @click="handleClickSearch">
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
      <a-popconfirm content="确认删除卡密？" @ok="handleClickDelete(record.ID)">
        <a-button type="text" status="danger">
          <template #icon>
            <icon-delete />
          </template>
          <template #default>删除</template>
        </a-button>
      </a-popconfirm>
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
    @change="getTicketsDataList"
  />
  <a-drawer
    :width="500"
    :visible="visibleAdd"
    unmount-on-close
    ok-text="添加卡密"
    @ok="handleOkAdd"
    @cancel="handleCancelAdd"
  >
    <template #title> 卡密新增 </template>
    <div>
      <a-form :model="formAdd" layout="vertical">
        <a-form-item field="tickets_key_count" label="添加数量">
          <a-input-number v-model="formAdd.tickets_key_count" />
        </a-form-item>
        <a-form-item field="tickets_key_points" label="卡密点券">
          <a-input-number v-model="formAdd.tickets_key_points" />
        </a-form-item>
        <a-form-item field="tickets_key_prefix" label="卡密前缀">
          <a-input v-model="formAdd.tickets_key_prefix" />
        </a-form-item>
        <a-form-item field="tickets_key_remarks" label="卡密备注">
          <a-input v-model="formAdd.tickets_key_remarks" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
  <a-drawer
    :width="500"
    :visible="visibleSearch"
    unmount-on-close
    ok-text="检索"
    @ok="handleOkSearch"
    @cancel="handleCancelSearch"
  >
    <template #title> 卡密筛选 </template>
    <div>
      <a-form :model="search" layout="vertical">
        <a-form-item field="email" label="检索内容">
          <a-select placeholder="选择检索项" @change="handleClickSearchChange">
            <a-option>卡密值</a-option>
            <a-option>卡密备注</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="email" label="检索状态">
          <a-select
            placeholder="选择检索项"
            @change="handleClickSearchChangeState"
          >
            <a-option>全部</a-option>
            <a-option>未使用</a-option>
            <a-option>已使用</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="points" label="欲检索内容">
          <a-input v-model="search.data" placeholder="值（支持模糊搜索）" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import {
    addTickets,
    deleteTickets,
    downloadTickets,
    getTicketsList,
    ticketsDataSearch,
  } from '@/api/tickets';
  import { Pagination } from '@/types/global';
  import moment from 'moment';
  import fileDownload from 'js-file-download';

  const basePagination: Pagination = {
    current: 1,
    pageSize: 20,
  };
  const formAdd = reactive({
    tickets_key_count: null,
    tickets_key_points: null,
    tickets_key_prefix: '',
    tickets_key_remarks: '',
  });
  const search = reactive({
    fc: '',
    state: '',
    data: '',
  });
  const DelTickets = reactive({
    id: 0,
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: '卡密值',
      dataIndex: 'tickets_key',
    },
    {
      title: '点券数',
      dataIndex: 'tickets_key_points',
    },
    {
      title: '卡密备注',
      dataIndex: 'tickets_key_remarks',
    },
    {
      title: '卡密状态',
      dataIndex: 'tickets_key_state',
      slotName: 'tickets_key_state',
    },
    {
      title: '生成时间',
      dataIndex: 'CreatedAt',
    },
    {
      title: '操作',
      slotName: 'optional',
    },
  ];
  const data = reactive({
    table: [],
  });
  const visibleAdd = ref(false);
  const visibleSearch = ref(false);

  const getTicketsDataList = async (page: number) => {
    await getTicketsList(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getTicketsDataList(basePagination.current);

  const handleClickAdd = () => {
    visibleAdd.value = true;
  };
  const handleOkAdd = () => {
    if (!formAdd.tickets_key_count) {
      Message.error('卡密数量不能为空');
      return;
    }

    if (!formAdd.tickets_key_points) {
      Message.error('卡密余额不能为空');
      return;
    }

    addTickets(formAdd).then((res) => {
      if (res.code === 2000) {
        getTicketsDataList(1);
        Message.success('添加成功');
        // downloadTickets()
        downloadTickets().then((res1) => {
          // debugger
          fileDownload(res1, 'CD-KEY.txt');
        });
      }
    });

    visibleAdd.value = false;
  };
  const handleCancelAdd = () => {
    visibleAdd.value = false;
  };
  const handleClickSearchChange = (fc: any) => {
    search.fc = fc;
  };
  const handleClickSearchChangeState = (state: any) => {
    search.state = state;
  };
  const handleClickSearch = () => {
    visibleSearch.value = true;
  };
  const handleOkSearch = () => {
    if (!search.fc) {
      Message.error('检索方法不能为空');
      return;
    }
    if (!search.data) {
      Message.error('检索值不能为空');
      return;
    }

    ticketsDataSearch(search).then((res) => {
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
    visibleSearch.value = false;
  };
  const handleCancelSearch = () => {
    visibleSearch.value = false;
  };
  const handleClickRefresh = () => {
    getTicketsDataList(1);
  };
  const handleClickDelete = (ID: number) => {
    DelTickets.id = ID;
    deleteTickets(DelTickets).then((res) => {
      if (res.code === 2000) {
        Message.success('删除成功');
        getTicketsDataList(basePagination.current);
      }
    });
  };
</script>
