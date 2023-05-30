import { createStore } from "vuex";
import { MockApi } from "@/clients/api";

export default createStore({
  state: {
    areAllPluginsEnabled: true,
  },
  getters: {},
  mutations: {
    setEnabled(state, enabled) {
      state.areAllPluginsEnabled = enabled;
    },
  },
  actions: {
    async setEnabled({ commit }, enabled) {
      await MockApi.setAllEnabled(enabled);
      commit("setEnabled", enabled);
    },
  },
  modules: {},
});
