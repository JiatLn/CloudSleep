<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { Pos } from '@/types'

const props = defineProps<{
  pos: Pos
  name: string
  message?: string
  isSleeping?: boolean
}>()

const styles = computed((): StyleValue => {
  if (!props.pos) {
    return {}
  }
  return {
    left: `${props.pos.x}px`,
    top: `${props.pos.y}px`,
    position: 'fixed',
  }
})
</script>

<template>
  <div v-show="!props.isSleeping" flex="c col" :style="styles">
    <span absolute top--4 left="50%" translate-x="-50%" border rounded-4px mb--4 py-1 px-2 bg-brand-primary text="white 12px" style="width: max-content">
      <!-- ({{ props.pos.x }}, {{ props.pos.y }}) -->
      {{ props.name }}
    </span>
    <div w-90px h-90px border>
      <img src="@/assets/img/Boy.png" alt="boy">
    </div>
    <div v-show="props.message?.length" class="cloud">
      <div flex-1>
        {{ props.message }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.cloud {
  width: max-content;
  @apply absolute border bg-gray text-white text-14px px-4 py-2 rounded-6px left-90px top-6px ani-bounce flex;

  &::before {
    content: "";
    position: absolute;
    top: 12px;
    left: -6px;
    width: 0;
    height: 0;
    border-top: 6px solid transparent;
    border-right: 6px solid rgb(156, 163, 175);
    border-bottom: 6px solid transparent;
  }
}
</style>
