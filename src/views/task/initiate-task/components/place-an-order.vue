<template>
  <a-alert v-show="showTips.show" type="warning" :show-icon="false">
    <template #title> 任务提示 </template>
    <div id="tips"></div>
  </a-alert>
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
      <a-form-item field="name" label="辅助功能">
        <span>
          <a v-show="showNumber.show" href="javascript:" class="file"
            >二维码识别 <input type="file" accept="image/*" @change="qrCode"
          /></a>
          &ensp;&ensp;
        </span>
        <span>
          <a href="javascript:" class="file" @click="batch">{{
            showNumber.title
          }}</a>
          &ensp;&ensp;
        </span>
        <span>
          <a
            v-show="!showNumber.show"
            href="javascript:"
            class="file"
            @click="copyToClipboard('----')"
          >
            复制标准分隔符
          </a>
        </span>
      </a-form-item>
      <a-form-item field="name" label="任务变量">
        <a-textarea
          v-model="form.variable"
          :placeholder="showNumber.data"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <a-form-item v-show="showNumber.show" field="post" label="任务数量">
        <a-input-number
          v-model="form.number"
          class="input-demo"
          placeholder="任务数量（1及以上）"
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
  import jsQR from 'jsqr';

  // 项目信息
  let projectData: ProjectList[] = [];
  // 价格信息
  const priceData = reactive({
    project_price: 0,
  });
  // 表单信息
  const form = reactive({
    task_type: '',
    model: 'single',
    variable: '',
    variableB: '',
    number: null,
    remarks: '',
  });
  // 任务提示显隐
  const showTips = reactive({
    show: false,
  });
  // 任务数量显隐
  const showNumber = reactive({
    title: '切换批量提交',
    show: true,
    data: '',
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
        if (item.project_tips !== '') {
          document.getElementById('tips')!.innerHTML = item.project_tips;
          showTips.show = true;
        } else {
          showTips.show = false;
        }
      } else if (item.project_remarks === value) {
        form.task_type = item.project_type;
        priceData.project_price = item.project_price;
        if (item.project_tips !== '') {
          document.getElementById('tips')!.innerHTML = item.project_tips;
          showTips.show = true;
        } else {
          showTips.show = false;
        }
      }
    });
  };
  // 二维码识别
  const qrCode = () => {
    const file = document.querySelector(
      'input[type="file"]'
    ) as HTMLInputElement;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file.files[0]);
    fileReader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        const imageData = ctx?.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData?.data, img.width, img.height);
        if (code) {
          form.variable = code.data;
        } else {
          form.variable = '无法识别图中二维码';
        }
      };
    };
  };
  // 提交按钮被点击
  const submit = () => {
    if (form.task_type === '') {
      Message.error('请选择任务类型');
      return;
    }
    if (form.variable === '') {
      Message.error('请填写任务变量');
      return;
    }

    // 把变量使用&符号连接
    if (form.model !== 'single') {
      form.variableB = form.variable.replace(/\n/g, '<&>');
    } else {
      form.variableB = form.variable;
    }
    sendProject(form).then((res) => {
      if (res.code === 2000) {
        Message.success('任务创建成功');
        form.variable = '';
        form.variableB = '';
        form.number = null;
        form.remarks = '';
      }
    });
  };
  // 切换批量提交按钮被点击
  const batch = () => {
    showNumber.show = !showNumber.show;
    if (showNumber.show) {
      showNumber.title = '切换批量提交';
      showNumber.data = '';
      form.model = 'single';
    } else {
      showNumber.title = '切换单个提交';
      showNumber.data =
        '每行一个任务变量「注意：批量提交不支持二维码识别辅助」, 格式：任务变量----任务数量(注意：分隔符是----符号)';
      form.model = 'multiple';
    }
  };

  function copyToClipboard(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => Message.success('复制成功'))
      .catch((err) => Message.success(err));
  }
</script>

<style scoped>
  .file {
    position: relative;
    display: inline-block;
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
