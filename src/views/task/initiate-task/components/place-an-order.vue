<template>
  <a-space
    direction="vertical"
    size="large"
    style="width: 100%; padding-top: 30px"
  >
    <a-form :model="form" :layout="layout">
      <a-form-item field="name" label="任务类型">
        <a-space direction="vertical">
          <a-select
            placeholder="请选择 ..."
            size="large"
            :trigger-props="{ autoFitPopupMinWidth: true }"
          >
            <a-option>Beijing</a-option>
            <a-option>ShanghaiShanghai</a-option>
            <a-option>GuangzhouGuangzhouGuangzhou</a-option>
          </a-select>
        </a-space>
      </a-form-item>
      <a-form-item field="name" label="项目点券">
        <a-space size="large">
          <a-statistic :value="12" :value-style="{ color: '#469dff' }">
            <template #suffix>
              <a-space> 点券 </a-space>
            </template>
          </a-statistic>
        </a-space>
      </a-form-item>
      <a-form-item field="name" label="任务变量">
        <a-input v-model="form.name" />
      </a-form-item>
      <a-form-item field="post" label="任务数量">
        <a-input-number
          v-model="form.post"
          class="input-demo"
          placeholder="任务票数（1票以上）"
          :min="1"
          :max="100"
        />
      </a-form-item>
      <a-form-item field="post" label="任务备注">
        <a-textarea
          placeholder="备注内容"
          :max-length="100"
          allow-clear
          show-word-limit
        />
      </a-form-item>
      <a-form-item>
        <a-button type="outline">
          <template #icon>
            <icon-up-circle />
          </template>
          <template #default>立&ensp;即&ensp;提&ensp;交</template>
        </a-button>
      </a-form-item>
    </a-form>
  </a-space>
</template>

<script>
  import { reactive, ref } from 'vue';

  export default {
    setup() {
      const layout = ref('vertical');
      const form = reactive({
        name: '',
        post: '',
        isRead: false,
      });

      return {
        layout,
        form,
      };
    },
  };
</script>

<style scoped></style>
