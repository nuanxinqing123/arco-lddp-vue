<template>
  <a-form :model="form" layout="vertical">
    <a-form-item field="name" label="网站名称">
      <a-input v-model="form.name" placeholder="LDDP" />
    </a-form-item>
    <a-form-item field="name" label="网站注册开关">
      关闭注册&ensp;<a-switch v-model="form.register" />&ensp;开启注册
    </a-form-item>
    <a-form-item field="name" label="网站下单开关">
      禁止下单&ensp;<a-switch v-model="form.isPao" />&ensp;允许下单
    </a-form-item>
    <a-form-item field="name" label="校验IP下单">
      不校验IP&ensp;<a-switch v-model="form.isCheckIP" />&ensp;校验IP
    </a-form-item>
    <a-form-item field="name" label="网站弹窗公告开关">
      关闭弹窗&ensp;<a-switch v-model="form.isNotice" />&ensp;打开弹窗
    </a-form-item>
    <a-form-item field="name" label="网站弹窗公告">
      <a-input v-model="form.notice" />
    </a-form-item>
    <a-form-item field="name" label="任务公告">
      <div style="border: 1px solid #ccc">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :default-config="toolbarConfig"
        />
        <Editor
          v-model="form.taskNotice"
          style="height: 500px; overflow-y: hidden"
          :default-config="editorConfig"
          @onCreated="handleCreated"
        />
      </div>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="updateWebSetting">提&ensp;交</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
  import { onBeforeUnmount, reactive, shallowRef } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { getWenSettings, sendWenSettings } from '@/api/settings';
  import { Message } from '@arco-design/web-vue';

  const form = reactive({
    name: '',
    register: false,
    isPao: false,
    isCheckIP: false,
    isNotice: false,
    notice: '',
    taskNotice: '',
  });

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();
  const toolbarConfig = {};
  const editorConfig = { placeholder: '请输入内容...' };

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: any) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };

  // 获取网站配置
  const getWebSetting = async () => {
    getWenSettings().then((res) => {
      form.name = res.data[0].value;
      form.register = res.data[1].value === '1';
      form.isPao = res.data[2].value === '1';
      form.isCheckIP = res.data[3].value === '1';
      form.isNotice = res.data[4].value === '1';
      form.notice = res.data[5].value;
      form.taskNotice = res.data[6].value;
    });
  };
  getWebSetting();

  // 修改网站配置
  const updateWebSetting = async () => {
    const params = [
      { key: 'web_name', value: form.name },
      { key: 'register', value: form.register ? '1' : '2' },
      { key: 'pao', value: form.isPao ? '1' : '2' },
      { key: 'check_ip', value: form.isCheckIP ? '1' : '2' },
      { key: 'notice_switch', value: form.isNotice ? '1' : '2' },
      { key: 'notice', value: form.notice },
      { key: 'task_notice', value: form.taskNotice },
    ];

    sendWenSettings(params).then((res) => {
      if (res.code === 2000) {
        Message.success('修改成功');
        getWebSetting();
      }
    });
  };
</script>

<style scoped lang="less"></style>
