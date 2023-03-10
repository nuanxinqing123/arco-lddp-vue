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
    ok-text="添加转发"
    @ok="handleOkAdd"
    @cancel="handleCancelAdd"
  >
    <template #title> 添加转发 </template>
    <div>
      <a-form :model="formAdd" layout="vertical">
        <a-form-item field="project_type" label="转发名称">
          <a-input v-model="formAdd.forward_name" />
        </a-form-item>
        <a-form-item field="project_price" label="转发地址">
          <a-textarea v-model="formAdd.forward_address" />
        </a-form-item>
        <a-form-item field="project_agent_price" label="退单地址">
          <a-textarea v-model="formAdd.forward_refund_address" />
        </a-form-item>
      </a-form>
      <h2>注意事项</h2>
      <p>1、转发地址和退单地址均需要支持POST请求</p>
      <p
        >2、转发地址和退单地址在接收请求成功后需要返回<code
          >{"code": 2000}</code
        >
        作为成功标识</p
      >
      <p
        >3、如果请求失败或返回非2000，订单将进入任务延迟队列。任务队列将每三分钟尝试再次发起请求（共五次）。超出尝试次数，订单将自动退款</p
      >
      <p
        >4、任务队列在系统内部内置，基于内存实现，重启服务系统将导致任务队列丢失</p
      >
      <p
        >5、系统只会对转发订单进行退款，退款转发如达到条件上限，则将移除任务队列，不进行任何操作</p
      >
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
    <template #title> 订单搜索 </template>
    <div>
      <a-form :model="search" layout="vertical">
        <a-form-item field="email" label="检索内容">
          <a-select placeholder="选择检索项" @change="handleClickSearchChange">
            <a-option>转发名称</a-option>
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
    <template #optional="{ record }">
      <a-button type="text" @click="handleClick(record)">
        <template #icon>
          <icon-edit />
        </template>
        <template #default>修改</template>
      </a-button>
      <a-popconfirm content="确认删除转发？" @ok="handleClickDelete(record.ID)">
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
    @change="getForwardData"
  />
  <a-drawer
    :width="500"
    :visible="visible"
    unmount-on-close
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <template #title> 转发编辑 </template>
    <div>
      <a-form :model="form" layout="vertical">
        <a-form-item field="email" label="转发名称">
          <a-input v-model="form.forward_name" />
        </a-form-item>
        <a-form-item field="points" label="订单转发地址">
          <a-textarea v-model="form.forward_address" />
        </a-form-item>
        <a-form-item field="email" label="退单转发地址">
          <a-textarea v-model="form.forward_refund_address" />
        </a-form-item>
      </a-form>
      <a-button type="outline" @click="handleClickTest">
        <template #icon>
          <icon-sync />
        </template>
        <template #default>测试API</template>
      </a-button>
      <p>测试API将会使用管理员身份生成一条假数据发送至API接口</p>
      <p></p>
      <h2>注意事项</h2>
      <p>1、转发地址和退单地址均需要支持POST请求</p>
      <p
        >2、转发地址和退单地址在接收请求成功后需要返回<code
          >{"code": 2000}</code
        >
        作为成功标识</p
      >
      <p
        >3、如果请求失败或返回非2000，订单将进入任务延迟队列。任务队列将每三分钟尝试再次发起请求（共五次）。超出尝试次数，订单将自动退款</p
      >
      <p
        >4、任务队列在系统内部内置，基于内存实现，重启服务系统将导致任务队列丢失</p
      >
      <p
        >5、系统只会对转发订单进行退款，退款转发如达到条件上限，则将移除任务队列，不进行任何操作</p
      >
    </div>
  </a-drawer>
  <a-divider />
  <div>
    <h2>转发参数解释</h2>
    <h3
      >订单转发接口
      <span>
        <a-link href="/v1/api/order/forward/demonstrate" icon>
          查看演示</a-link
        ></span
      ></h3
    >
    <a-table :pagination="false" :columns="columnsAPI" :data="dataAPI">
    </a-table>
    <h3
      >退单转发接口
      <span>
        <a-link href="/v1/api/order/refund/demonstrate" icon>
          查看演示</a-link
        ></span
      ></h3
    >
    <a-table :pagination="false" :columns="columnsAPI" :data="dataAPIRF">
    </a-table>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { Pagination } from '@/types/global';
  import moment from 'moment/moment';
  import {
    getForwardDataList,
    forwardDataSearch,
    addForward,
    updateForward,
    deleteForward,
    getForwardTest,
  } from '@/api/forward';
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
      title: '转发名称',
      dataIndex: 'forward_name',
    },
    {
      title: '订单转发地址',
      dataIndex: 'forward_address',
      ellipsis: true,
      tooltip: true,
      width: 300,
    },
    {
      title: '退单转发地址',
      dataIndex: 'forward_refund_address',
      ellipsis: true,
      tooltip: true,
      width: 300,
    },
    {
      title: '创建时间',
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
  const columnsAPI = [
    {
      title: 'ID',
      dataIndex: 'ID',
    },
    {
      title: '参数名称',
      dataIndex: 'parameter_name',
    },
    {
      title: '参数类型',
      dataIndex: 'parameter_type',
    },
    {
      title: '参数解释',
      dataIndex: 'parameter_interpretation',
    },
  ];
  const dataAPI = [
    {
      ID: 1,
      parameter_name: 'order_task_type',
      parameter_type: 'string',
      parameter_interpretation: '订单类型',
    },
    {
      ID: 2,
      parameter_name: 'order_id',
      parameter_type: 'string',
      parameter_interpretation: '订单ID',
    },
    {
      ID: 3,
      parameter_name: 'order_uid',
      parameter_type: 'string',
      parameter_interpretation: '订单所属用户UID',
    },
    {
      ID: 4,
      parameter_name: 'order_tickets',
      parameter_type: 'int64',
      parameter_interpretation: '订单所需点券',
    },
    {
      ID: 5,
      parameter_name: 'order_number',
      parameter_type: 'int',
      parameter_interpretation: '订单任务数量',
    },
    {
      ID: 6,
      parameter_name: 'order_variable',
      parameter_type: 'string',
      parameter_interpretation: '任务变量',
    },
    {
      ID: 7,
      parameter_name: 'order_remarks',
      parameter_type: 'string',
      parameter_interpretation: '订单备注',
    },
    {
      ID: 8,
      parameter_name: 'order_state',
      parameter_type: 'int',
      parameter_interpretation:
        '订单状态（-1：等待中、0：进行中、1：已完成、2：已终止、3：退款中、4：已退款）',
    },
    {
      ID: 9,
      parameter_name: 'order_state_reason',
      parameter_type: 'string',
      parameter_interpretation: '订单终止原因',
    },
    {
      ID: 10,
      parameter_name: 'order_status',
      parameter_type: 'string',
      parameter_interpretation: '订单实况',
    },
    {
      ID: 11,
      parameter_name: 'order_ip',
      parameter_type: 'string',
      parameter_interpretation: '操作用户IP',
    },
  ];
  const dataAPIRF = [
    {
      ID: 1,
      parameter_name: 'order_id',
      parameter_type: 'string',
      parameter_interpretation: '订单ID',
    },
    {
      ID: 2,
      parameter_name: 'order_uid',
      parameter_type: 'string',
      parameter_interpretation: '订单所属用户UID',
    },
  ];
  const search = reactive({
    fc: '',
    data: '',
  });
  const form = reactive({
    id: 0,
    forward_name: '',
    forward_address: '',
    forward_refund_address: '',
  });
  const formAdd = reactive({
    forward_name: '',
    forward_address: '',
    forward_refund_address: '',
  });
  const visibleAdd = ref(false);
  const visibleSearch = ref(false);
  const visible = ref(false);

  const getForwardData = async (page: number) => {
    await getForwardDataList(page).then((res) => {
      basePagination.current = res.data.page;
      data.table = res.data.page_data;
      data.table.forEach((item) => {
        item.CreatedAt = moment(item.CreatedAt).format('YYYY-MM-DD HH:mm:ss');
      });
    });
  };
  getForwardData(basePagination.current);
  const handleClick = (record: any) => {
    form.id = record.ID;
    form.forward_name = record.forward_name;
    form.forward_address = record.forward_address;
    form.forward_refund_address = record.forward_refund_address;
    visible.value = true;
  };
  const handleOk = () => {
    if (!form.forward_name) {
      Message.error('转发名称不能为空');
      return;
    }
    if (!form.forward_address) {
      Message.error('订单转发地址不能为空');
      return;
    }
    if (!form.forward_refund_address) {
      Message.error('退单转发地址不能为空');
      return;
    }

    updateForward(form).then((res) => {
      if (res.code === 2000) {
        Message.success('修改成功');
        getForwardData(basePagination.current);
      }
    });

    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
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

    forwardDataSearch(search).then((res) => {
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
  const handleClickAdd = () => {
    visibleAdd.value = true;
  };
  const handleOkAdd = () => {
    if (!formAdd.forward_name) {
      Message.error('转发名称不能为空');
      return;
    }

    if (!formAdd.forward_address) {
      Message.error('转发地址不能为空');
      return;
    }

    if (!formAdd.forward_refund_address) {
      Message.error('退单地址不能为空');
      return;
    }

    addForward(formAdd).then((res) => {
      if (res.code === 2000) {
        Message.success('添加成功');
        getForwardData(basePagination.current);
      }
    });

    visibleAdd.value = false;
  };
  const handleCancelAdd = () => {
    visibleAdd.value = false;
  };
  const handleClickRefresh = () => {
    getForwardData(1);
  };
  const handleClickDelete = (ID: number) => {
    const delID = {
      id: ID,
    };
    deleteForward(delID).then((res) => {
      if (res.code === 2000) {
        Message.success('删除成功');
        getForwardData(basePagination.current);
      }
    });
  };
  // API测试
  const handleClickTest = () => {
    const d = {
      forward_address: form.forward_address,
      forward_refund_address: form.forward_refund_address,
    };
    getForwardTest(d).then((res) => {
      if (res.code === 2000) {
        Message.success(res.mag);
      }
    });
  };
</script>
