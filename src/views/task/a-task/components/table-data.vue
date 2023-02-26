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
  <a-drawer
    :width="500"
    :visible="visibleAdd"
    unmount-on-close
    ok-text="添加项目"
    @ok="handleOkAdd"
    @cancel="handleCancelAdd"
  >
    <template #title> 添加项目 </template>
    <div>
      <a-form :model="formAdd" layout="vertical">
        <a-form-item field="project_type" label="项目类名">
          <a-input v-model="formAdd.project_type" />
        </a-form-item>
        <a-form-item field="project_price" label="项目价格">
          <a-input-number v-model="formAdd.project_price" />
        </a-form-item>
        <a-form-item field="project_agent_price" label="项目代理价格">
          <a-input-number v-model="formAdd.project_agent_price" />
        </a-form-item>
        <a-form-item field="project_remarks" label="项目备注">
          <a-input v-model="formAdd.project_remarks" />
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
    <template #title> 用户编辑 </template>
    <div>
      <a-form :model="search" layout="vertical">
        <a-form-item field="email" label="检索内容">
          <a-select placeholder="选择检索项" @change="handleClickSearchChange">
            <a-option>项目类名</a-option>
            <a-option>项目备注</a-option>
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
    <template #project_state="{ record }">
      <span v-if="record.project_state === true">
        <a-tag bordered color="green">允许下单</a-tag>
      </span>
      <span v-else>
        <a-tag bordered color="red">暂停下单</a-tag>
      </span>
    </template>
    <template #project_agent_state="{ record }">
      <span v-if="record.project_agent_state === true">
        <a-tag bordered color="green">允许下单</a-tag>
      </span>
      <span v-else>
        <a-tag bordered color="red">暂停下单</a-tag>
      </span>
    </template>
    <template #optional="{ record }">
      <a-button type="text" @click="handleClick(record)">
        <template #icon>
          <icon-edit />
        </template>
        <template #default>修改</template> </a-button
      >&ensp;
      <a-popconfirm content="确认删除项目？" @ok="handleClickDelete(record.ID)">
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
    @change="getProjectData"
  />
  <a-drawer
    :width="500"
    :visible="visible"
    unmount-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 项目编辑 </template>
    <div>
      <a-form :model="form" layout="vertical">
        <a-form-item field="email" label="项目类名">
          <a-input v-model="form.project_type" />
        </a-form-item>
        <a-form-item field="points" label="项目价格">
          <a-input-number v-model="form.project_price" />
        </a-form-item>
        <a-form-item field="points" label="项目代理价格">
          <a-input-number v-model="form.project_agent_price" />
        </a-form-item>
        <a-form-item field="email" label="项目备注">
          <a-input v-model="form.project_remarks" />
        </a-form-item>
        <a-form-item field="is_state" label="是否允许下单">
          <a-switch v-model="form.project_state" />
        </a-form-item>
        <a-form-item field="is_state" label="代理是否允许下单">
          <a-switch v-model="form.project_agent_state" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Pagination } from '@/types/global';
  import {
    addProject,
    deleteProject,
    getProjectDataList,
    projectDataSearch,
    updateProject,
  } from '@/api/task';
  import moment from 'moment/moment';
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
      title: '项目类名',
      dataIndex: 'project_type',
    },
    {
      title: '项目价格',
      dataIndex: 'project_price',
    },
    {
      title: '项目代理价格',
      dataIndex: 'project_agent_price',
    },
    {
      title: '项目备注',
      dataIndex: 'project_remarks',
    },
    {
      title: '项目状态',
      dataIndex: 'project_state',
      slotName: 'project_state',
    },
    {
      title: '项目代理状态',
      dataIndex: 'project_agent_state',
      slotName: 'project_agent_state',
    },
    {
      title: '添加时间',
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
  const form = reactive({
    id: 0,
    project_type: '',
    project_price: null,
    project_agent_price: null,
    project_remarks: '',
    project_state: true,
    project_agent_state: false,
  });
  const formAdd = reactive({
    project_type: '',
    project_price: null,
    project_agent_price: null,
    project_remarks: '',
  });
  const search = reactive({
    fc: '',
    data: '',
  });
  const Del = reactive({
    id: 0,
  });
  const visibleAdd = ref(false);
  const visibleSearch = ref(false);
  const visible = ref(false);

  const getProjectData = async (page: number) => {
    await getProjectDataList(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getProjectData(basePagination.current);

  const handleClick = (record: any) => {
    form.id = record.ID;
    form.project_type = record.project_type;
    form.project_price = record.project_price;
    form.project_agent_price = record.project_agent_price;
    form.project_remarks = record.project_remarks;
    form.project_state = record.project_state;
    form.project_agent_state = record.project_agent_state;
    visible.value = true;
  };
  const handleOk = () => {
    if (!form.project_type) {
      Message.error('项目类名不能为空');
      return;
    }

    if (!form.project_price) {
      Message.error('项目价格不能为空');
      return;
    }

    updateProject(form).then((res) => {
      if (res.code === 2000) {
        Message.success('修改成功');
        getProjectData(basePagination.current);
      }
    });

    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
  const handleClickAdd = () => {
    visibleAdd.value = true;
  };
  const handleOkAdd = () => {
    if (!formAdd.project_type) {
      Message.error('项目类名不能为空');
      return;
    }

    if (!formAdd.project_price) {
      Message.error('项目价格不能为空');
      return;
    }

    addProject(formAdd).then((res) => {
      if (res.code === 2000) {
        Message.success('添加成功');
        getProjectData(basePagination.current);
      }
    });

    visibleAdd.value = false;
  };
  const handleCancelAdd = () => {
    visibleAdd.value = false;
  };
  const handleClickSearch = () => {
    visibleSearch.value = true;
  };
  const handleClickSearchChange = (fc: any) => {
    search.fc = fc;
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

    projectDataSearch(search).then((res) => {
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
    getProjectData(1);
  };
  const handleClickDelete = (ID: number) => {
    Del.id = ID;
    deleteProject(Del).then((res) => {
      if (res.code === 2000) {
        Message.success('删除成功');
        getProjectData(basePagination.current);
      }
    });
  };
</script>
