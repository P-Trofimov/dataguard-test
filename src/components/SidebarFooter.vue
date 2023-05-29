<template>
  <p class="sidebar-footer" :class="{ disabled: !areAllEnabled }">
    All plugins {{ verb }}
    <ToggleSwitch
      :sidebar="true"
      :value="areAllEnabled"
      @input="areAllEnabled = $event"
    />
  </p>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import ToggleSwitch from "@/components/ToggleSwitch.vue";

const areAllEnabled = ref(true);
const verb = computed(() => (areAllEnabled.value ? "enabled" : "disabled"));
</script>

<style lang="scss" scoped>
@mixin gradient($color) {
  background: linear-gradient(0deg, $color 0%, $color-bg-gray 50%);
}
.sidebar-footer {
  margin-top: auto;
  margin-bottom: 0;
  padding: 2rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  transition: 0.4s;
  @include gradient($color-allowed);
  &.disabled {
    @include gradient($color-blocked);
  }
}
</style>
