import { defineStore } from 'pinia'
import type { Pos } from '@/types'

export interface IPeopleInfo {
  pos: Pos
  name: string
  socketId: string
}

export const usePeopleStore = defineStore('people', () => {
  const userList = ref<IPeopleInfo[]>([])

  function updateUser(socketId: string, info: Partial<IPeopleInfo>) {
    const idx = userList.value.findIndex(user => user.socketId === socketId)
    userList.value[idx] = { ...userList.value[idx], ...info }
  }

  function isOnList(socketId: string) {
    return userList.value.findIndex(user => user.socketId === socketId) !== -1
  }

  function addUser(socketId: string, info: Partial<IPeopleInfo>) {
    if (isOnList(socketId)) {
      return
    }
    const newUser = { ...info, socketId } as IPeopleInfo
    userList.value.push(newUser)
  }

  return {
    userList,
    addUser,
    updateUser,
    isOnList,
  }
})
