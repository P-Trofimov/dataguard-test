<template>
  <p class="sidebar-footer" :class="{ disabled: !areAllEnabled }">
    All plugins {{ pluginsStatus }}
    <ToggleSwitch
      :sidebar="true"
      :value="areAllEnabled"
      @input="setAllEnabled"
    />
  </p>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import { getLS, request } from "@/utils/helpers";
import { useStore } from "vuex";

const areAllEnabled = ref(true);
const pluginsStatus = computed(() =>
  areAllEnabled.value ? "enabled" : "disabled"
);

const store = useStore();

const setAllEnabled = (value: boolean) => {
  areAllEnabled.value = value;
  store.dispatch("setEnabled", value);
};

onMounted(async () => {
  areAllEnabled.value = await request(getLS, ["allEnabled"]);
});
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
