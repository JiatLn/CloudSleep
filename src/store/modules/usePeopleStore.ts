import { defineStore, storeToRefs } from 'pinia'
import type { Pos } from '@/types'

export interface IPeopleInfo {
  pos: Pos
  name: string
  socketId: string
}

export const usePeopleStore = defineStore('people', () => {
  const userList = ref<IPeopleInfo[]>([])

  const otherUserList = computed(() => {
    const store = useUserStore()
    const { user } = storeToRefs(store)
    return userList.value.filter(item => item.name !== user.value?.name)
  })

  function updateUser(name: string, info: Partial<IPeopleInfo>) {
    const idx = userList.value.findIndex(user => user.name === name)
    userList.value[idx] = { ...userList.value[idx], ...info }
  }

  function addUser(userInfo: IPeopleInfo) {
    const idx = userList.value.findIndex(user => user.name === userInfo.name)
    if (idx !== -1) {
      userList.value[idx] = userInfo
      return
    }
    userList.value.push(userInfo)
  }

  function deleteUser(socketId: string) {
    const idx = userList.value.findIndex(user => user.socketId === socketId)
    if (idx !== -1) {
      const store = useUserStore()
      if (store.user?.name === userList.value[idx].name) {
        store.userLogout()
      }
      userList.value.splice(idx, 1)
    }
  }

  return {
    otherUserList,
    userList,
    addUser,
    updateUser,
    deleteUser,
  }
})
