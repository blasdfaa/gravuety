<script lang="ts">
import type { PolymorphicProps, QAProps } from '../../types'
import type { PinInputSize, PinInputType } from './types'

export interface PinInputProps extends QAProps, PolymorphicProps {
  /**
   * Input field size.
   * @default 'm'
   */
  size?: PinInputSize
  /**
   * Determines which input value types are allowed.
   * @default "numeric"
   */
  type?: PinInputType
  /** Placeholder for inputs */
  placeholder?: string
  /**
   * When set to `true`, adds `autocomplete="one-time-code"` to inputs.
   * @default false
   */
  otp?: boolean
  /**
   * When set to `true`, the input values will be masked as the password field.
   * @default false
   */
  mask?: boolean
  /**
   * Number of input fields.
   * @default 4
   */
  length?: number
  /**
   * @default false
   */
  disabled?: boolean
  /**
   * Parent's width distributed evenly between inputs.
   * @default false
   */
  responsive?: boolean
  /**
   * Whether to blur the input when the value is complete
   * @default false
   */
  blurOnComplete?: boolean
}

export interface PinInputEmits {
  change: [id: number]
  update: [value: string]
}

export interface PinInputSlots {
  note?: () => any
  errorMessage?: () => any
}

export interface PinInputExpose {
  focus: () => void
}
</script>

<script lang="ts" setup>
import { PinInput, usePinInput } from '@ark-ui/vue/pin-input'
import { computed } from 'vue'
import { useBlock } from '../../composables'
import TextInput from '../text-input/text-input.vue'

const props = withDefaults(defineProps<PinInputProps>(), {
  size: 'm',
  length: 4,
  type: 'numeric',
  otp: false,
  disabled: false,
  mask: false,
  responsive: false,
  blurOnComplete: false,
})

defineExpose<PinInputExpose>({ focus })

const { b } = useBlock('pin-input')

const inputs = computed(() => new Uint8Array(Math.max(1, props.length)).map((_, i) => i))
const pinInputContextProps = computed(() => ({
  disabled: props.disabled,
  placeholder: props.placeholder,
  count: inputs.value.length,
  type: props.type,
  otp: props.otp,
  mask: props.mask,
  blurOnComplete: props.blurOnComplete,
}))
const pinInput = usePinInput(pinInputContextProps)

function focus() {
  pinInput.value.focus()
}
</script>

<template>
  <PinInput.RootProvider
    :value="pinInput"
    :class="b({ size: props.size, responsive: props.responsive })"
    :data-qa="qa"
  >
    <PinInput.Control :class="b('items')">
      <div
        v-for="id in inputs"
        :key="id"
        :class="b('item')"
      >
        <TextInput
          v-bind="pinInput.getInputProps({ index: id })"
          :control-class="b('control')"
          :size="size"
          :disabled="disabled"
        />
      </div>
    </PinInput.Control>

    <PinInput.HiddenInput />
  </PinInput.RootProvider>
</template>

<style lang="scss">
@use '../../styles/variables';

$block: '.#{variables.$ns}pin-input';

#{$block} {
  display: inline-block;

  &__items {
    display: flex;
    gap: var(--g-pin-input-item-gap, var(--_--gap));
  }

  &__item {
    flex: 0 0 auto;
    width: var(--g-pin-input-item-width, var(--_--item-width));
    line-height: 0;
  }

  &__control {
    // stylelint-disable declaration-no-important
    padding-inline: 0 !important;
    text-align: center;
    appearance: none;
  }

  &_size {
    &_s {
      --_--item-width: 22px;
      --_--gap: 6px;
    }

    &_m {
      --_--item-width: 26px;
      --_--gap: 8px;
    }

    &_l {
      --_--item-width: 34px;
      --_--gap: 10px;
    }

    &_xl {
      --_--item-width: 42px;
      --_--gap: 12px;
    }
  }

  &_responsive {
    display: block;

    #{$block}__item {
      width: auto;
      flex: 1 1 auto;
    }
  }
}
</style>
