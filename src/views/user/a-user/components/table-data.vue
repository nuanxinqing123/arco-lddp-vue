<template>
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
            <a-option>用户UID</a-option>
            <a-option>用户邮箱</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="points" label="欲检索内容">
          <a-input v-model="search.data" placeholder="值（支持模糊搜索）" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>

  <a-table :pagination="false" :columns="columns" :data="data.table">
    <template #role="{ record }">
      <span v-if="record.role === 'admin'">
        <a-tag bordered color="blue">管理员</a-tag>
      </span>
      <span v-else-if="record.role === 'proxy'">
        <a-tag bordered color="orange">代理</a-tag>
      </span>
      <span v-else>
        <a-tag bordered color="gray">用户</a-tag>
      </span>
    </template>
    <template #is_state="{ record }">
      <span v-if="record.is_state === true">
        <a-tag bordered color="green">正常</a-tag>
      </span>
      <span v-else>
        <a-tag bordered color="red">封禁</a-tag>
      </span>
    </template>
    <template #optional="{ record }">
      <a-button type="text" @click="handleClick(record)">
        <template #icon>
          <icon-edit />
        </template>
        <template #default>修改</template>
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
    @change="getUserDataList"
  />
  <a-drawer
    :width="500"
    :visible="visible"
    unmount-on-closeß
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 用户编辑 </template>
    <div>
      <a-form :model="form" layout="vertical">
        <a-form-item field="email" label="用户邮箱">
          <a-input v-model="form.email" />
        </a-form-item>
        <a-form-item field="points" label="用户点券">
          <a-input-number v-model="form.points" />
        </a-form-item>
        <a-form-item field="is_admin" label="角色权限">
          <!--          <a-switch v-model="form.role" />-->
          <a-select
            v-model="selectModel"
            placeholder="选择角色权限"
            @change="handleClickRoleChange"
          >
            <a-option>用户</a-option>
            <a-option>代理</a-option>
            <a-option>管理员</a-option>
          </a-select>
        </a-form-item>
        <a-form-item field="is_state" label="是否封禁">
          <a-switch v-model="form.is_state" />
        </a-form-item>
      </a-form>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { Pagination } from '@/types/global';
  import moment from 'moment/moment';
  import { getUserData, userDataSearch, userDataUpdate } from '@/api/user';
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
      title: '用户UID',
      dataIndex: 'user_id',
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
    },
    {
      title: '用户点券',
      dataIndex: 'points',
    },
    {
      title: '角色权限',
      dataIndex: 'role',
      slotName: 'role',
    },
    {
      title: '用户状态',
      dataIndex: 'is_state',
      slotName: 'is_state',
    },
    {
      title: '登录IP',
      dataIndex: 'login_ip',
    },
    {
      title: '注册时间',
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
    email: '',
    points: 0,
    role: '',
    is_state: false,
  });
  const search = reactive({
    fc: '',
    data: '',
  });
  const visible = ref(false);
  const visibleSearch = ref(false);
  const selectModel = ref('用户');

  const handleClickSearchChange = (fc: any) => {
    search.fc = fc;
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

    // 发送筛选请求
    userDataSearch(search).then((res) => {
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

  const handleClickRoleChange = (role: any) => {
    if (role === '用户') {
      form.role = 'user';
    } else if (role === '代理') {
      form.role = 'proxy';
    } else if (role === '管理员') {
      form.role = 'admin';
    }
  };
  // 获取用户列表
  const getUserDataList = async (page: number) => {
    await getUserData(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getUserDataList(basePagination.current);
  const handleClick = (record: any) => {
    form.id = record.ID;
    form.email = record.email;
    form.points = record.points;
    form.is_state = record.is_state !== true;
    if (record.role === 'user') {
      selectModel.value = '用户';
      form.role = 'user';
    } else if (record.role === 'proxy') {
      selectModel.value = '代理';
      form.role = 'proxy';
    } else if (record.role === 'admin') {
      selectModel.value = '管理员';
      form.role = 'admin';
    }
    visible.value = true;
  };
  const handleOk = () => {
    if (!form.email) {
      Message.error('用户邮箱不能为空');
      return;
    }
    if (form.points < 0) {
      Message.error('用户余额不能为空');
      return;
    }

    form.is_state = form.is_state !== true;

    // 发送用户修改请求
    userDataUpdate(form).then((res) => {
      if (res.code === 2000) {
        getUserDataList(basePagination.current);
        Message.success(res.data);
      }
    });

    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };

  const handleClickRefresh = () => {
    getUserDataList(1);
  };
</script>
