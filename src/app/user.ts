export class User {
  position: [number, number]
  name: string
  STEP = 5
  constructor(position: [number, number], name: string) {
    this.position = position
    this.name = name
  }

  getPosition() {
    return {
      x: this.position[0],
      y: this.position[1],
    }
  }

  onKeyDown(e: KeyboardEvent) {
    const { key } = e
    const { x, y } = this.getPosition()

    switch (key) {
      case 'ArrowUp':
        if (y <= 0)
          return
        this.position = [x, y - this.STEP]
        break
      case 'ArrowDown':
        this.position = [x, y + this.STEP]
        break
      case 'ArrowLeft':
        if (x <= 0)
          return
        this.position = [x - this.STEP, y]
        break
      case 'ArrowRight':
        this.position = [x + this.STEP, y]
        break
    }
  }

  move(position: [number, number]) {
    this.position = position
  }
}
