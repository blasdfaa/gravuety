<script setup lang="ts">
import type { PinInputSize, PinInputType } from '../types'
import { ref } from 'vue'
import PinInput from '../pin-input.vue'

const state = ref({
  size: 'm' as PinInputSize,
  type: 'alphabetic' as PinInputType,
})
</script>

<template>
  <Story group="components" title="Inputs / PinInput">
    <template #controls>
      <HstSelect
        v-model="state.size"
        title="size"
        :options="['m', 's', 'l', 'xl']"
      />

      <HstSelect
        v-model="state.type"
        title="type"
        :options="['numeric', 'alphanumeric', 'alphabetic']"
      />
    </template>

    <PinInput
      :size="state.size"
      :type="state.type"
    />
  </Story>
</template>
