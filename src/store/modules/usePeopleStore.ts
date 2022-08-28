import { defineStore } from 'pinia'

export interface IPeopleInfo {
  position: {
    x: number
    y: number
  }
  name: string
  socketId: string
}

export const usePeopleStore = defineStore('people', () => {
  const userList = ref<IPeopleInfo[]>([])

  function updateUser(socketId: string, info: Partial<IPeopleInfo>) {
    const idx = userList.value.findIndex(user => user.socketId === socketId)
    userList.value[idx] = { ...userList.value[idx], ...info }
  }

  function addUser(socketId: string, info: IPeopleInfo) {
    userList.value.push({ ...info, socketId })
  }

  return {
    userList,
    addUser,
    updateUser,
  }
})
