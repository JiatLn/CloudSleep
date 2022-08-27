<script setup lang="ts">
import { User } from '@/app/user'
import type { Bed } from '@/types'

const bedItems = ref<Bed[]>(
  Array.from({ length: 8 * 8 }, _ => ({
    position: [0, 0],
    isUsed: false,
  })),
)

const user = ref<User>(new User([80, 40], 'user'))

onMounted(() => {
  document.addEventListener('keydown', e => user.value.onKeyDown(e))
})

const styles = computed(() => {
  return {
    top: `${user.value.getPosition().y}px`,
    left: `${user.value.getPosition().x}px`,
  }
})
</script>

<template>
  <div h-full w-full flex="c col" all:transition-400>
    <div fixed right-2 top-2>
      My Position: ({{ user.getPosition().x }}, {{ user.getPosition().y }})
    </div>
    <div mb-8 italic font="mono" text="36px brand-primary">
      Welcome to Cloud Sleep~~
    </div>
    <div grid="~ cols-8 row-auto gap-40px" mx-auto>
      <div v-for="item, idx in bedItems" :key="idx" text="gray" w-50px h-50px i-iconoir:bed />
    </div>
    <div fixed animate-bounce animate-count-infinite animate-duration-3s :style="styles" w-50px h-50px i-emojione-monotone:man-in-suit-levitating />
  </div>
</template>

<style lang="less" scoped>
</style>
