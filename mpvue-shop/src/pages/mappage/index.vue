<template>
  <div>
    <div class="mappage">
      <div class="section">
        <input
          type="text"
          placeholder="搜索"
          focus="true"
          v-model="keywords"
          @input="bindInput"
        />
      </div>
      <scroll-view :scroll-y="true" class="addcont" style="height: 500rpx;">
        <div
          class="result"
          @touchstart="bindSearch(item.name)"
          v-for="(item, index) in tips"
          :key="index"
        >
          {{ item.name }}
        </div>
      </scroll-view>
      <div class="map_container">
        <div class="title">显示当前位置:</div>
        <map
          class="map"
          id="map"
          scale="16"
          :longitude="longitude"
          :latitude="latitude"
          :markers="markers"
        ></map>
      </div>
    </div>
  </div>
</template>

<script>
import amapFile from "../../utils/amap-wx";
export default {
  data() {
    return {
      tips: [],
      longitude: 0,
      latitude: 0,
      markers: [],
      keywords: "",
    };
  },
  methods: {
    getMapAddress() {
      let _this = this;
      const myAmapFun = new amapFile.AMapWX({
        key: "12d06610823ed1516604646c9a8747cd",
      });
      myAmapFun.getRegeo({
        iconPath: "/static/images/marker.png",
        iconWidth: 22,
        iconHeight: 32,
        success: (data) => {
          console.log(data);
          let marker = [
            {
              id: data[0].id,
              longitude: data[0].longitude,
              latitude: data[0].latitude,
              width: data[0].width,
              height: data[0].height,
            },
          ];
          _this.markers = marker;
          _this.longitude = data[0].longitude;
          _this.latitude = data[0].latitude;
        },
      });
    },
    bindInput(e) {
      console.log(e);
      let _this = this;
      let keywords = _this.keywords;
      const myAmapFun = new amapFile.AMapWX({
        key: "12d06610823ed1516604646c9a8747cd",
      });
      myAmapFun.getInputtips({
        keywords,
        location: "",
        success: (data) => {
          if (data && data.tips) {
            _this.tips = data.tips;
          }
        },
      });
    },
    bindSearch(city) {
      this.$store.commit("update", city);
      wx.navigateBack({
        delta: 1,
      });
    },
  },
  mounted() {
    this.getMapAddress();
  },
};
</script>

<style lang="less" scoped>
@import url("./style");
</style>
