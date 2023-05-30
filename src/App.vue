<template>
  <div class="wrapper">
    <SidebarSection :tabs="tabs" />
    <main>
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { Ref, onMounted, ref } from "vue";
import { MockApi } from "@/clients/api";
import SidebarSection from "@/components/SidebarSection.vue";
import { useStore } from "vuex";

let tabs: Ref<{ id: string; title: string; icon: string }[]> = ref([]);
const store = useStore();

onMounted(async () => {
  tabs.value = await MockApi.getTabs();
  const allEnabled = await MockApi.getAllEnabled();
  store.commit("setEnabled", allEnabled);
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}
</style>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  min-height: 100vh;
}
</style>
