<template>
  <a-space
    direction="vertical"
    size="large"
    style="width: 100%; padding-top: 30px"
  >
    <a-form :model="form" layout="vertical">
      <a-form-item field="name" label="任务类型">
        <a-space direction="vertical">
          <a-select
            placeholder="请选择 ..."
            size="large"
            :scrollbar="true"
            :trigger-props="{ autoFitPopupMinWidth: true }"
            @change="projectChange"
          >
            <a-option v-for="item in projectData" :key="item.project_type">
              <span v-if="item.project_remarks !== ''">{{
                item.project_remarks
              }}</span>
              <span v-else>{{ item.project_type }}</span>
            </a-option>
          </a-select>
        </a-space>
      </a-form-item>
      <a-form-item field="name" label="项目点券">
        <a-space size="large">
          <a-statistic
            :value="priceData.project_price"
            :value-style="{ color: '#469dff' }"
          >
            <template #suffix>
              <a-space> 点券 </a-space>
            </template>
          </a-statistic>
        </a-space>
      </a-form-item>
      <!--      <div>-->
      <!--        <a href="javascript:" class="file"-->
      <!--          >选择文件 <input type="file" accept="image/*"-->
      <!--        /></a>-->
      <!--      </div>-->
      <a-form-item field="name" label="任务变量">
        <a-textarea v-model="form.variable" allow-clear show-word-limit />
      </a-form-item>
      <a-form-item field="post" label="任务数量">
        <a-input-number
          v-model="form.number"
          class="input-demo"
          placeholder="任务票数（1票以上）"
          :min="1"
        />
      </a-form-item>
      <a-form-item field="post" label="任务备注">
        <a-textarea
          v-model="form.remarks"
          placeholder="备注内容"
          :max-length="100"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <a-form-item>
        <a-button type="outline" @click="submit">
          <template #icon>
            <icon-up-circle />
          </template>
          <template #default>立&ensp;即&ensp;提&ensp;交</template>
        </a-button>
      </a-form-item>
    </a-form>
  </a-space>
</template>

<script lang="ts" setup>
  import { getProjectList, ProjectList, sendProject } from '@/api/task';
  import { reactive } from 'vue';
  import { Message } from '@arco-design/web-vue';

  // 项目信息
  let projectData: ProjectList[] = [];
  // 价格信息
  const priceData = reactive({
    project_price: 0,
  });
  // 表单信息
  const form = reactive({
    task_type: '',
    variable: '',
    number: null,
    remarks: '',
  });
  const gpl = () => {
    getProjectList().then((res) => {
      projectData = res.data;
    });
  };
  gpl();

  // 项目修改事件
  const projectChange = (value: any) => {
    projectData.forEach((item) => {
      if (item.project_type === value) {
        form.task_type = item.project_type;
        priceData.project_price = item.project_price;
      } else if (item.project_remarks === value) {
        form.task_type = item.project_type;
        priceData.project_price = item.project_price;
      }
    });
  };

  // 提交按钮被点击
  const submit = () => {
    sendProject(form).then((res) => {
      if (res.code === 2000) {
        Message.success('任务创建成功');
        form.task_type = '';
        form.variable = '';
        form.number = null;
        form.remarks = '';
      }
    });
  };
</script>

<style scoped>
  .file {
    position: relative;
    display: inline-block;
    margin-left: 10px;
    padding: 5px 10px;
    overflow: hidden;
    color: #c78c1e;
    line-height: 20px;
    text-decoration: none;
    text-indent: 0;
    background: #fff4d0;
    border: 1px solid #f5e399;
    border-radius: 4px;
  }

  .file input {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    font-size: 100px;
    opacity: 0;
  }

  .file:hover {
    color: #743e00;
    text-decoration: none;
    background: #fdd6aa;
    border-color: #f3b678;
  }
</style>
