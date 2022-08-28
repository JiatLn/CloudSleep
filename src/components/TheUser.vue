<script setup lang="ts">
import type { StyleValue } from 'vue'
import type { Pos } from '@/types'

const props = defineProps<{
  pos: Pos
  name: string
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
  <div flex="c col" :style="styles">
    <span border rounded-4px mb-4 px-1 bg-brand-primary text="white">{{ props.name }}</span>
    <div animate-bounce animate-count-infinite animate-duration-3s w-50px h-50px i-emojione-monotone:man-in-suit-levitating />
  </div>
</template>

<style scoped lang="scss">
</style>
