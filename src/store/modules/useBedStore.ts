import { defineStore } from 'pinia'
import type { Bed, Direction, Pos } from '@/types'

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

  // Collision detection
  function checkCollisionDetction(pos: Pos, direction: Direction) {
    const left = pos.x + 32
    const right = pos.x + 34
    const top = pos.y + 30
    const bottom = pos.y + 50
    switch (direction) {
      case 'ArrowUp':
        return bedList.value.some(
          bed =>
            bed.pos.y + 50 >= top
            && bed.pos.y <= top
            && bed.pos.x <= right
            && bed.pos.x + 50 >= left,
        )
      case 'ArrowDown':
        return bedList.value.some(
          bed =>
            bed.pos.y <= bottom

            && bed.pos.y + 50 >= bottom
            && bed.pos.x <= right
            && bed.pos.x + 50 >= left,
        )
      case 'ArrowLeft':
        return bedList.value.some(
          bed =>
            bed.pos.x + 50 >= left
            && bed.pos.x <= left
            && bed.pos.y <= bottom
            && bed.pos.y + 50 >= top,
        )
      case 'ArrowRight':
        return bedList.value.some(
          bed =>
            bed.pos.x <= right
            && bed.pos.x + 50 >= right
            && bed.pos.y <= bottom
            && bed.pos.y + 50 >= top,
        )
    }
  }

  return {
    bedList,
    refreshPos,
    updateBedState,
    checkCollisionDetction,
  }
})
