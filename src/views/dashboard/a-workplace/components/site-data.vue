<template>
  <a-card
    class="general-card"
    title="站点数据"
    :header-style="{ paddingBottom: '12px' }"
  >
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
                : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-statistic
                  title="日消费数"
                  :value="WebData.to_day_user_consume"
                  :value-from="0"
                  animation
                  show-group-separator
                />
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
                : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-statistic
                  title="日订单数"
                  :value="WebData.to_day_order"
                  :value-from="0"
                  animation
                  show-group-separator
                />
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
                : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-statistic
                  title="总订单数"
                  :value="WebData.all_order"
                  :value-from="0"
                  animation
                  show-group-separator
                />
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
                : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-statistic
                  title="注册用户数"
                  :value="WebData.all_user"
                  :value-from="0"
                  animation
                  show-group-separator
                />
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
                : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-statistic
                  title="日充值数"
                  :value="WebData.to_day_recharge"
                  :value-from="0"
                  animation
                  show-group-separator
                />
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
                : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-statistic
                  title="日注册数"
                  :value="WebData.to_day_register_user"
                  :value-from="0"
                  animation
                  show-group-separator
                />
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
                : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-tooltip
                  content="七日内消费或登录的用户"
                  background-color="#722ED1"
                >
                  <a-statistic
                    title="活跃用户数"
                    :value="WebData.active_user"
                    :value-from="0"
                    animation
                    show-group-separator
                  />
                </a-tooltip>
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <a-spin style="width: 100%">
          <a-card
            :bordered="false"
            :style="{
              background: isDark
                ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
                : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
            }"
          >
            <div class="content-wrap">
              <div class="content">
                <a-tooltip content="余额 < 0的用户" background-color="#722ED1">
                  <a-statistic
                    title="有效用户数"
                    :value="WebData.effective_user"
                    :value-from="0"
                    animation
                    show-group-separator
                  />
                </a-tooltip>
              </div>
            </div>
          </a-card>
        </a-spin>
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import useThemes from '@/hooks/themes';
  import { reactive } from 'vue';
  import { getSiteData } from '@/api/site-data';

  const { isDark } = useThemes();

  const WebData = reactive({
    to_day_user_consume: 0,
    to_day_order: 0,
    all_order: 0,
    all_user: 0,
    to_day_recharge: 0,
    to_day_register_user: 0,
    active_user: 0,
    effective_user: 0,
  });

  // 获取站点数据
  const getWebData = async () => {
    const { data } = await getSiteData();
    WebData.to_day_user_consume = data.to_day_user_consume;
    WebData.to_day_order = data.to_day_order;
    WebData.all_order = data.all_order;
    WebData.all_user = data.all_user;
    WebData.to_day_recharge = data.to_day_recharge;
    WebData.to_day_register_user = data.to_day_register_user;
    WebData.active_user = data.active_user;
    WebData.effective_user = data.effective_user;
  };
  getWebData();
</script>
