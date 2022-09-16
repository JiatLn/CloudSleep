import { useBedStore } from '@/store'
import type { Pos } from '@/types'

export class User {
  pos: Pos
  name: string
  message: string
  sleepIdx: number
  STEP = 5
  timer: any = null
  socketId: string
  constructor(pos: Pos, name: string) {
    this.pos = pos
    this.name = name
    this.message = ''
    this.sleepIdx = -1
    this.socketId = ''
  }

  cheat(message: string) {
    this.message = message
    if (this.timer) {
      clearTimeout(this.timer)
    }
    this.timer = setTimeout(() => {
      this.message = ''
    }, 3000)
  }

  onSleep(bedIdx: number) {
    this.sleepIdx = bedIdx
  }

  get isSleeping() {
    return this.sleepIdx !== -1
  }

  onKeyDown(e: KeyboardEvent) {
    if (this.isSleeping)
      return
    const { key } = e
    const { x, y } = this.pos
    let nextPos = { x, y }
    switch (key) {
      case 'ArrowUp':
        if (y <= 0)
          return
        nextPos = { x, y: y - this.STEP }
        break
      case 'ArrowDown':
        nextPos = { x, y: y + this.STEP }
        break
      case 'ArrowLeft':
        if (x <= 0)
          return
        nextPos = { x: x - this.STEP, y }
        break
      case 'ArrowRight':
        nextPos = { x: x + this.STEP, y }
        break
      default:
        return
    }
    // 床的碰撞检测
    const bedStore = useBedStore()
    if (bedStore.checkCollisionDetction(nextPos, key)) {
      return
    }
    this._move(nextPos)
  }

  _move(pos: Pos) {
    this.pos = pos
  }
}
