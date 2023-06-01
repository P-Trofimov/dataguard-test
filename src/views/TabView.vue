<template>
  <div class="tab">
    <h1 class="heading" v-show="tabData.title">{{ tabData.title }} Plugins</h1>
    <div class="cards">
      <PluginCard
        v-for="plugin in sortedPlugins"
        :key="plugin.title"
        :title="plugin.title"
        :description="plugin.description"
        :active="plugin.active"
        :disabled="plugin.disabled || !store.state.areAllPluginsEnabled"
        @toggle-active="toggleActive(plugin.id, $event)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { MockApi } from "@/clients/api";
import { PluginData, PluginDataFull, TabData } from "@/types/tabs";
import { Ref, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import PluginCard from "@/components/PluginCard.vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();
const tabData: Ref<TabData> = ref({
  title: "",
  icon: "",
  active: [],
  inactive: [],
  disabled: [],
});

async function fetchTabData() {
  const tabId = router.currentRoute.value.params.tabId as string;
  return MockApi.getTabData(tabId);
}

async function refreshData() {
  tabData.value = await fetchTabData();
  const plugins = await fetchAndEnrichPlugins(tabData.value);
  sortedPlugins.value = sortPlugins(plugins);
}

function sortPlugins(plugins: PluginDataFull[]) {
  return plugins.sort((a, b) =>
    a.title.localeCompare(b.title, undefined, {
      numeric: true,
      sensitivity: "base",
    })
  );
}

async function fetchPlugins(list: string[]): Promise<PluginData[]> {
  return Promise.all(list.map((plugin) => MockApi.getPluginData(plugin)));
}

async function fetchAndEnrichPlugins(tabData: TabData) {
  const result: PluginDataFull[] = [];

  const [active, inactive, disabled] = await Promise.all([
    fetchPlugins(tabData.active),
    fetchPlugins(tabData.inactive),
    fetchPlugins(tabData.disabled),
  ]);

  result.push(
    ...active.map((plugin) => ({
      ...plugin,
      active: true,
      disabled: false,
    })),
    ...inactive.map((plugin) => ({
      ...plugin,
      active: false,
      disabled: false,
    })),
    ...disabled.map((plugin) => ({
      ...plugin,
      active: false,
      disabled: true,
    }))
  );
  return result;
}

async function toggleActive(pluginId: string, event: boolean) {
  const tab: TabData = tabData.value;

  const addTo = event ? tab.active : tab.inactive;
  const removeFrom = event ? tab.inactive : tab.active;

  const index = removeFrom.indexOf(pluginId);
  removeFrom.splice(index, 1);
  addTo.push(pluginId);

  tabData.value = tab;

  await MockApi.setTabData(
    router.currentRoute.value.params.tabId as string,
    tabData.value
  );
  refreshData();
}

const sortedPlugins: Ref<PluginDataFull[]> = ref([]);

onMounted(refreshData);
</script>

<style lang="scss" scoped>
.tab {
  padding: 1rem;
}

.heading {
  padding-top: 0.5rem;
  padding-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: normal;
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
  padding: 0 2rem;
}
</style>
