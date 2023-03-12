<template>
  <div class="container">
    <Breadcrumb :items="['个人中心', '工作台']" />
    <div v-show="!isShow" class="header" style="margin-bottom: 12px">
      <a-carousel
        id="lb-img"
        :style="{
          width: '100%',
          height: '180px',
        }"
        :auto-play="true"
        indicator-type="dot"
        show-arrow="hover"
      >
        <a-carousel-item v-for="image in imagesPC" :key="image">
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
            alt="images"
          />
        </a-carousel-item>
      </a-carousel>
    </div>
    <div v-show="isShow" class="header" style="margin-bottom: 12px">
      <a-carousel
        id="lb-img"
        :style="{
          width: '100%',
          height: '130px',
        }"
        :auto-play="true"
        indicator-type="dot"
        show-arrow="hover"
      >
        <a-carousel-item v-for="image in imagesMb" :key="image">
          <img
            :src="image"
            :style="{
              width: '100%',
            }"
            alt="images"
          />
        </a-carousel-item>
      </a-carousel>
    </div>
    <UserInfoHeader />
    <div class="left-side" style="margin-top: 12px">
      <div class="panel">
        <Banner />
        <DataPanel />
        <ContentChart />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import UserInfoHeader from './components/user-info-header.vue';
  import Banner from './components/banner.vue';
  import DataPanel from './components/data-panel.vue';
  import ContentChart from './components/content-chart.vue';

  const isShow = ref(false);
  const imagesPC = [
    'https://pic.6b7.xyz/2023/03/12/ec31420268b23.png',
    'https://pic.6b7.xyz/2023/03/12/9a923ce2d801d.png',
  ];
  const imagesMb = ['https://pic.6b7.xyz/2023/03/12/307b311f1c6bc.png'];

  // 判断窗口的宽高
  const width = window.innerWidth;
  // 判断是否是移动端
  const isMobile = width < 768;
  isShow.value = isMobile;
</script>

<script lang="ts">
  export default {
    name: 'Dashboard', // If you want the include property of keep-alive to take effect, you must name the component
  };
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    justify-content: center;

    :deep(.arco-avatar-trigger-icon-button) {
      color: rgb(var(--arcoblue-6));

      :deep(.arco-icon) {
        vertical-align: -1px;
      }
    }

    .user-msg {
      .arco-icon {
        color: rgb(var(--gray-10));
      }

      .arco-typography {
        margin-left: 6px;
      }
    }
  }

  .container {
    margin-bottom: 20px;
    padding: 0 20px 20px;
  }

  .left-side {
    flex: 1;
    overflow: auto;
  }

  .right-side {
    width: 280px;
    margin-left: 16px;
  }

  .panel {
    overflow: auto;
    background-color: var(--color-bg-2);
    border-radius: 4px;
  }

  :deep(.panel-border) {
    margin-bottom: 0;
    border-bottom: 1px solid rgb(var(--gray-2));
  }

  .moduler-wrap {
    background-color: var(--color-bg-2);
    border-radius: 4px;

    :deep(.text) {
      color: rgb(var(--gray-8));
      font-size: 12px;
      text-align: center;
    }

    :deep(.wrapper) {
      margin-bottom: 8px;
      text-align: center;
      cursor: pointer;

      &:last-child {
        .text {
          margin-bottom: 0;
        }
      }

      &:hover {
        .icon {
          color: rgb(var(--arcoblue-6));
          background-color: #e8f3ff;
        }

        .text {
          color: rgb(var(--arcoblue-6));
        }
      }
    }

    :deep(.icon) {
      display: inline-block;
      width: 32px;
      height: 32px;
      margin-bottom: 4px;
      color: rgb(var(--dark-gray-1));
      font-size: 16px;
      line-height: 32px;
      text-align: center;
      background-color: rgb(var(--gray-1));
      border-radius: 4px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  .mobile {
    .container {
      display: block;
    }

    .right-side {
      // display: none;
      width: 100%;
      margin-top: 16px;
      margin-left: 0;
    }
  }
</style>
