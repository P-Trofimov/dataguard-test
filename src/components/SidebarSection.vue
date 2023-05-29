<template>
  <aside class="sidebar">
    <SidebarHeader />
    <nav>
      <ul>
        <li v-for="tab in props.tabs" :key="tab.id">
          <NavLink :id="tab.id" :title="tab.title" :icon="tab.icon" />
        </li>
      </ul>
    </nav>
    <SidebarFooter />
  </aside>
</template>

<script setup lang="ts">
import { PropType, defineProps } from "vue";
import SidebarHeader from "@/components/SidebarHeader.vue";
import SidebarFooter from "@/components/SidebarFooter.vue";
import NavLink from "@/components/NavLink.vue";
import { SidebarTab } from "@/types/tabs";

const props = defineProps({
  tabs: {
    type: Array as PropType<SidebarTab[]>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  min-width: 20%;
  width: 20%;
  background-color: $color-bg-gray;

  nav ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
}
</style>
