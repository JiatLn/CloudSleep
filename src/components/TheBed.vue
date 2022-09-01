<script setup lang="ts">
import type { Bed } from '@/types'

const bedItems = ref<Bed[]>(
  Array.from({ length: 8 * 4 }, _ => ({
    isUsed: false,
    pos: { x: 0, y: 0 },
  })),
)

const bedListRef = ref<HTMLDivElement>()

onMounted(() => {
  refreshPos()
})

useResizeObserver(document.body, (_) => {
  refreshPos()
})

function refreshPos() {
  const children = bedListRef.value?.children
  if (children) {
    for (let i = 0; i < children.length; i++) {
      const child = children[i] as HTMLDivElement
      bedItems.value[i].pos = {
        x: child.offsetLeft,
        y: child.offsetTop,
      }
    }
  }
}
</script>

<template>
  <div ref="bedListRef" grid="~ cols-8 row-auto gap-40px" mx-auto>
    <div v-for="item, idx in bedItems" :key="idx" text="gray" w-80px h-80px border relative>
      <img src="@/assets/img/bedEmpty.png" alt="bed">
      <span text="12px #333" absolute bottom--6 left="50%" translate-x="-50%" style="width:max-content">({{ item.pos.x }}, {{ item.pos.y }})</span>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
