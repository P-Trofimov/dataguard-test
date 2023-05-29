<template>
  <div class="tab">
    <h1>{{ tabData.title }} Plugins</h1>
    <div class="cards">
      <PluginCard
        v-for="plugin in sortedPlugins"
        :key="plugin.title"
        :title="plugin.title"
        :description="plugin.description"
        :active="plugin.active"
        :disabled="plugin.disabled"
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

function sortPlugins(plugins: PluginDataFull[]): PluginDataFull[] {
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
    }))
  );
  result.push(
    ...inactive.map((plugin) => ({
      ...plugin,
      active: false,
      disabled: false,
    }))
  );
  result.push(
    ...disabled.map((plugin) => ({
      ...plugin,
      active: false,
      disabled: true,
    }))
  );
  return removeDuplicates(result);
}

function removeDuplicates(plugins: PluginDataFull[]): PluginDataFull[] {
  return plugins.filter((plugin, index, self) => {
    return self.findIndex((p) => p.title === plugin.title) === index;
  });
}

const sortedPlugins: Ref<PluginDataFull[]> = ref([]);

onMounted(async () => {
  tabData.value = await fetchTabData();
  const plugins = await fetchAndEnrichPlugins(tabData.value);
  sortedPlugins.value = sortPlugins(plugins);
});
</script>

<style lang="scss" scoped>
.tab {
  padding: 1rem;
}
.cards {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2rem;
}
</style>
