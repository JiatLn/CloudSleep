import type { Pos } from '@/types'

export class User {
  pos: Pos
  name: string
  message: string
  STEP = 5
  constructor(pos: Pos, name: string) {
    this.pos = pos
    this.name = name
    this.message = ''
  }

  onTold(message: string) {
    this.message = message
    setTimeout(() => {
      this.message = ''
    }, 3000)
  }

  onKeyDown(e: KeyboardEvent) {
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
