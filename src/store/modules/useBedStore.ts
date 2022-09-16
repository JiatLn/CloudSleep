import { defineStore } from 'pinia'
import type { Bed } from '@/types'

export const useBedStore = defineStore('bed', () => {
  const bedList = ref<Bed[]>(
    Array.from({ length: 8 * 4 }, _ => ({
      isUsed: false,
      pos: { x: 0, y: 0 },
    })),
  )

  function refreshPos(bedListWrap: HTMLDivElement) {
    const children = bedListWrap?.children
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i] as HTMLDivElement
        bedList.value[i].pos = {
          x: child.offsetLeft,
          y: child.offsetTop,
        }
      }
    }
  }

  function updateBedState(bedIdx: number, isUsed: boolean) {
    bedList.value[bedIdx].isUsed = isUsed
  }

  return {
    bedList,
    refreshPos,
    updateBedState,
  }
})
