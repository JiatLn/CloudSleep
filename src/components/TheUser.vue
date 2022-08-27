<script setup lang="ts">
const props = defineProps<{
  position: {
    x: number
    y: number
  }
}>()

const styles = computed(() => {
  return {
    left: `${props.position.x}px`,
    top: `${props.position.y}px`,
  }
})
</script>

<template>
  <div fixed animate-bounce animate-count-infinite animate-duration-3s :style="styles" w-50px h-50px i-emojione-monotone:man-in-suit-levitating />
</template>

<style scoped lang="scss">
</style>
