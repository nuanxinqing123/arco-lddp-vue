<template>
  <div>
    <a-form :model="form" :style="{ width: '600px' }">
      <a-form-item field="password" label="Bot API对接密码">
        <a-input
          v-model="form.password"
          placeholder="please enter your password..."
        />
      </a-form-item>
      <a-form-item
        v-for="(post, index) of form.posts"
        :key="index"
        :field="`posts.${index}.value`"
        :label="`授权IP_${index}`"
      >
        <a-input
          v-model="post.value"
          placeholder="please enter your authorize IP..."
        />
        <a-button :style="{ marginLeft: '10px' }" @click="handleDelete(index)"
          >Delete</a-button
        >
      </a-form-item>
    </a-form>
    <div>
      <a-button @click="handleAdd">添加新IP</a-button>&ensp;&ensp;
      <a-button type="primary" @click="updateBotAPI">提交修改</a-button>
    </div>
  </div>
  <a-divider />
  <div>
    <p>Bot 接口 API文档</p>
    <p
      >地址：<a
        target="_blank"
        href="https://console-docs.apipost.cn/preview/6c56b1d1c3fb4c35/f5ab92e20f5a3903"
        >https://console-docs.apipost.cn/preview/6c56b1d1c3fb4c35/f5ab92e20f5a3903</a
      ></p
    >
    <p>密码：509666</p>
  </div>
</template>

<script lang="ts" setup>
  import { reactive } from 'vue';
  import { GetBotAPISetting, SaveBotAPISetting } from '@/api/bot';
  import { Message } from '@arco-design/web-vue';

  const form = reactive({
    password: '',
    posts: [{ value: '' }],
  });
  const handleAdd = () => {
    form.posts.push({
      value: '',
    });
  };
  const handleDelete = (index: any) => {
    form.posts.splice(index, 1);
  };
  const getBotAPI = async () => {
    const res = await GetBotAPISetting();
    form.password = res.data.pass_word;
    form.posts = res.data.auth_ip.split('&').map((item: any) => {
      return {
        value: item,
      };
    });
  };
  getBotAPI();
  const updateBotAPI = () => {
    const data = {
      pass_word: form.password,
      auth_ip: '',
    };
    form.posts.forEach((item: any) => {
      data.auth_ip += `${item.value}&`;
    });
    // console.log(data);
    SaveBotAPISetting(data).then(() => {
      Message.success('修改成功');
    });
  };
</script>

<style scoped lang="less"></style>
