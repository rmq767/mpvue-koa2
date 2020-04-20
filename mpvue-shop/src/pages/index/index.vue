<template>
  <div class="index">
    <!-- 头部搜索 -->
    <div class="search">
      <div @click="toMapPage">{{ city }}</div>
      <div @click="toSearch">
        <input type="text" placeholder="搜索商品" />
        <span class="icon"></span>
      </div>
    </div>
    <!-- 轮播图 -->
    <div class="swiper">
      <swiper
        class="swiper-container"
        indicator-dots="true"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
        indicator-color="#ccc"
      >
        <block v-for="(item, index) in banner" :key="index">
          <swiper-item class="swiper-item">
            <image class="slide-image" :src="item.image_url"></image>
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- tabs -->
    <div class="channel">
      <div
        v-for="(item, index) in channel"
        :key="index"
        @click="categroyList(item.id)"
      >
        <img :src="item.icon_url" alt="" />
        <p>{{ item.name }}</p>
      </div>
    </div>
    <!-- brand -->
    <div class="brand">
      <div class="head" @click="tobrandList">
        品牌制造商直供
      </div>
      <div class="content">
        <div
          v-for="(item, index) in brandList"
          :key="index"
          @click="branddetail(item.id)"
        >
          <div>
            <p>{{ item.name }}</p>
            <p class="price">{{ item.floor_price }}元起</p>
          </div>
          <img :src="item.new_pic_url" alt="" />
        </div>
      </div>
    </div>
    <!-- 新品 -->
    <div class="newgoods">
      <div class="newgoods-top" @click="goodsList('new')">
        <div class="top">
          <p>新品首发</p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item, index) in newGoods" :key="index">
              <img :src="item.list_pic_url" alt="" />
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>¥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 热品 -->
    <div class="newgoods hotgoods">
      <div class="newgoods-top" @click="goodsList('hot')">
        <div class="top">
          <p>
            人气推荐
            <span></span>
            好物精选
          </p>
          <p>查看全部</p>
        </div>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li v-for="(item, index) in hotGoods" :key="index">
              <img :src="item.list_pic_url" alt="" />
              <p>{{ item.name }}</p>
              <p>{{ item.goods_brief }}</p>
              <p>¥{{ item.retail_price }}</p>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <!-- 专题精选 -->
    <div class="topicList">
      <div class="topicList-top">
        专题精选
        <span class="icon"></span>
      </div>
      <div class="list">
        <ul>
          <scroll-view class="scroll-view" :scroll-x="true">
            <li
              v-for="(item, index) in topicList"
              :key="index"
              @click="topicdetail(item.id)"
            >
              <img :src="item.item_pic_url" alt="" />
              <div class="btom">
                <div>
                  <p>{{ item.title }}</p>
                  <p>{{ item.subtitle }}</p>
                </div>
                <div>{{ item.price_info }}元起</div>
              </div>
            </li>
          </scroll-view>
        </ul>
      </div>
    </div>
    <div class="newcategory">
      <div class="list" v-for="(item, index) in newCategoryList" :key="index">
        <div class="head">{{ item.name }}好物</div>
        <div class="sublist">
          <div v-for="(subitem, subindex) in item.goodsList" :key="subindex">
            <img :src="subitem.list_pic_url" alt="" />
            <p>{{ subitem.name }}</p>
            <p>{{ subitem.retail_price }}</p>
          </div>
          <div>
            <div class="last">
              <p>{{ item.name }}好物</p>
              <span class="icon"></span>
            </div>
          </div>
        </div>
      </div>
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
      channel: [],
      brandList: [],
      newGoods: [],
      hotGoods: [],
      topicList: [],
      newCategoryList: [],
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
      this.banner = res.banner;
      this.channel = res.channel;
      this.brandList = res.brandList;
      this.newGoods = res.newGoods;
      this.hotGoods = res.hotGoods;
      this.topicList = res.topicList;
      this.newCategoryList = res.newCategoryList;
    },
    categroyList(id) {
      wx.navigateTo({
        url: `/pages/categroylist/main?id=${id}`,
      });
    },
    tobrandList() {
      wx.navigateTo({
        url: "/pages/brandlist/main",
      });
    },
    branddetail(id) {
      wx.navigateTo({
        url: `/pages/branddetail/main?id=${id}`,
      });
    },
    goodsList(type) {
      if (type === "hot") {
        wx.navigateTo({
          url: `/pages/newgoods/main?isHot=${1}`,
        });
      } else {
        wx.navigateTo({
          url: `/pages/newgoods/main?isNew=${1}`,
        });
      }
    },
    topicdetail(id) {
      wx.navigateTo({
        url: `/pages/topicdetail/main?id=${id}`,
      });
    },
    toSearch() {
      wx.navigateTo({
        url: `/pages/search/main`,
      });
    },
  },
  computed: {
    city() {
      return this.$store.state.city;
    },
  },
  mounted() {
    this.getData();
    this.getCity();
  },
};
</script>

<style lang="less" scoped>
@import url("./style");
</style>
