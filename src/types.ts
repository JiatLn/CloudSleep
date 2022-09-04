export interface Bed {
  pos: Pos
  isUsed: boolean
}

export interface Pos {
  x: number
  y: number
}

export interface MoveData {
  socketId: string
  position: Pos
}
