<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBedStore } from '@/store'

const bedStore = useBedStore()
const { bedList } = storeToRefs(bedStore)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const bedListRef = ref<HTMLDivElement>()

onMounted(() => {
  if (bedListRef.value)
    bedStore.refreshPos(bedListRef.value)
})

useResizeObserver(document.body, (_) => {
  if (bedListRef.value)
    bedStore.refreshPos(bedListRef.value)
})

watch(
  () => user.value?.sleepIdx,
  (_, oldIdx) => {
    if (oldIdx !== undefined && oldIdx !== -1) {
      bedStore.updateBedState(oldIdx, false)
    }
  },
)

function toSleep(bedIdx: number) {
  const bed = bedList.value[bedIdx]
  if (bed.isUsed || !user.value) {
    return
  }
  user.value.onSleep(bedIdx)
  bedStore.updateBedState(bedIdx, true)
}
</script>

<template>
  <div ref="bedListRef" grid="~ cols-8 row-auto gap-40px" mx-auto>
    <div
      v-for="item, idx in bedList" :key="idx"
      cursor="pointer"
      :class="{ 'border-brand-primary! border-solid': item.isUsed }"
      w-80px h-80px relative @click="toSleep(idx)"
    >
      <img v-if="!item.isUsed" src="@/assets/img/bedEmpty.png" alt="bed" hover="op-40">
      <img v-if="item.isUsed" src="@/assets/img/bedBoy.png" alt="bed" hover="op-40">
      <span text="12px #333" absolute bottom--6 left="50%" translate-x="-50%" style="width:max-content" hidden>({{ item.pos.x }}, {{ item.pos.y }})</span>
    </div>
  </div>
</template>

<style scoped lang="less">
</style>
