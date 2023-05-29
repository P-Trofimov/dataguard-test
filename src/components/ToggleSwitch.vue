<template>
  <div class="toggle-switch" :class="{ sidebar: sidebar }">
    <label class="switch">
      <input type="checkbox" :checked="checked" @change="changeHandler" />
      <span class="slider round"></span>
      <CustomIcon
        v-if="sidebar"
        name="icon-power"
        class="power-icon"
        :color="checked ? '#5bc88d' : '#c63040'"
      />
    </label>
    <span class="text" :class="{ blocked: !checked }">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch, computed } from "vue";
import CustomIcon from "@/components/CustomIcon.vue";

const props = defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  sidebar: {
    type: Boolean,
    default: false,
  },
});

const checked = ref(false);

watch(
  () => props.value,
  (newValue: boolean) => {
    if (newValue !== checked.value) {
      checked.value = newValue;
    }
  },
  { immediate: true }
);

const emit = defineEmits(["input"]);
function changeHandler() {
  checked.value = !checked.value;
  emit("input", checked.value);
}

const text = computed(() => {
  if (props.sidebar) {
    return "";
  } else {
    return props.value ? "Allowed" : "Blocked";
  }
});
</script>

<style lang="scss" scoped>
.toggle-switch {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.switch {
  position: relative;
  display: inline-block;
  width: 2.3rem;
  height: 1.2rem;
  margin: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }
}

.sidebar {
  .switch {
    width: 3.4rem;
    height: 2rem;
  }

  .power-icon {
    position: absolute;
    left: 0.45rem;
    bottom: 0.35rem;
    height: 1.3rem;
    width: 1.3rem;
    transition: 0.3s;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  }

  .slider {
    &::before {
      height: 1.6rem;
      width: 1.6rem;
      left: 0.3rem;
      bottom: 0.2rem;
      transition: 0.3s;
      box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
    }
  }

  input:checked + .slider {
    background-color: $color-allowed;

    &::before {
      transform: translateX(1.4rem);
    }
  }
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: $color-blocked;
  transition: 0.4s;

  &::before {
    position: absolute;
    content: "";
    height: 0.9rem;
    width: 0.9rem;
    left: 0.15rem;
    bottom: 0.15rem;
    background-color: #fff;
    transition: 0.3s;
    box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.1);
  }
}

input:checked {
  & ~ .power-icon {
    transform: translateX(1.4rem);
  }
  & ~ .slider {
    background-color: $color-allowed;

    &::before {
      transform: translateX(1.1rem);
    }
  }
}

.slider.round {
  border-radius: 10rem;

  &::before {
    border-radius: 50%;
  }
}

.text {
  color: $color-allowed;

  &.blocked {
    color: $color-blocked;
  }
}
</style>
