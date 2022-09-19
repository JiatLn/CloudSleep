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

export type Direction
  = 'ArrowUp' | 'ArrowDown' | 'ArrowLeft' | 'ArrowRight' | 'w' | 'a' | 's' | 'd'

export type Sex = 'M' | 'F'

export interface LoginForm {
  username: string
  sex: Sex
  pos: Pos
}
