import type { Pos } from '@/types'

export class User {
  pos: Pos
  name: string
  message: string
  sleepIdx: number
  STEP = 5
  timer: any = null
  constructor(pos: Pos, name: string) {
    this.pos = pos
    this.name = name
    this.message = ''
    this.sleepIdx = -1
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

    switch (key) {
      case 'ArrowUp':
        if (y <= 0)
          return
        this._move({
          x,
          y: y - this.STEP,
        })
        break
      case 'ArrowDown':
        this._move({
          x,
          y: y + this.STEP,
        })
        break
      case 'ArrowLeft':
        if (x <= 0)
          return
        this._move({
          x: x - this.STEP,
          y,
        })
        break
      case 'ArrowRight':
        this._move({
          x: x + this.STEP,
          y,
        })
        break
    }
  }

  _move(pos: Pos) {
    this.pos = pos
  }
}
