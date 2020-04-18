import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    city: "定位中...",
  },
  mutations: {
    update(state, config) {
      state.city = config;
      // Object.keys(config).map((item, key) => {
      //   state[item] = config[item];
      // });
    },
  },
});

export default store;
