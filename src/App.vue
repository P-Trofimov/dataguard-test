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

let tabs: Ref<{ id: string; title: string }[]> = ref([]);

onMounted(async () => {
  tabs.value = await MockApi.getTabs();
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
