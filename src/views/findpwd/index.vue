<template>
  <div
    style="
      background: url('https://pic.6b7.xyz/2023/01/24/xd.svg') no-repeat fixed
        right bottom;
    "
  >
    <div class="container">
      <div class="logo">
        <img
          alt="logo"
          src="https://pic.6b7.xyz/2023/02/28/98ad89022a0b2.ico"
        />
        <div class="logo-text" style="color: #598bff">LDDP</div>
      </div>
      <div class="content">
        <div
          class="content-inner"
          style="background-color: white; border-radius: 20px; opacity: 0.9"
        >
          <FindPwdForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import FindPwdForm from './components/findpwd-form.vue';
</script>

<style lang="less" scoped>
  .container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
