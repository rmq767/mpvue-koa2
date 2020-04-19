<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMapPage">{{ city }}</div>
      <div>
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-docs="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper_item">
            <image class="slide_image" :src="item.image_url"></image>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
import { get } from "../../utils/index";
export default {
  data() {
    return {
      banner: [],
    };
  },
  methods: {
    toMapPage() {
      // wx.getSetting,查询用户是否授权
      wx.getSetting({
        success: (result) => {
          console.log(result);
          // 如果没有授权，打开设置
          if (!result.authSetting["scope.userLocation"]) {
            wx.openSetting({
              success: (result) => {
                // 获取授权位置信息
                this.getCity();
              },
              fail: (err) => {
                console.log(err);
              },
              complete: () => {},
            });
          } else {
            wx.navigateTo({
              url: "/pages/mappage/main",
            });
          }
        },
      });
    },
    getCity() {
      let _this = this;
      var myAmapFun = new amapFile.AMapWX({
        key: "12d06610823ed1516604646c9a8747cd",
      });
      myAmapFun.getRegeo({
        success: (res) => {
          console.log(res);
        },
        fail: (err) => {
          _this.$store.commit("update", "北京");
        },
      });
    },
    async getData() {
      const res = await get("/index");
      console.log(res.data);
    },
  },
  computed: {
    city() {
      return this.$store.state.city;
    },
  },
};
</script>

<style lang="less" scoped>
@import url("./style");
</style>
