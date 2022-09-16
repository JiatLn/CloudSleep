import { defineStore } from 'pinia'
import { socket } from '@/app/socket'
import { User } from '@/app/user'
import type { Pos } from '@/types'

export interface IUserInfo {
  position: Pos
  name: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | undefined>()

  const isLogin = computed(() => !!user.value)

  function userLogin(name: string, position: Pos) {
    user.value = new User(position, name)
    window.addEventListener('keydown', e => user.value?.onKeyDown((e)))
    socket.emit('addUser', user.value)
  }

  function userLogout() {
    user.value = undefined
    window.removeEventListener('keydown', e => user.value?.onKeyDown((e)))
  }

  function userCheat(msg: string) {
    if (!user.value)
      return
    user.value.cheat(msg)
    socket.emit('userCheat', {
      userName: user.value?.name,
      msg,
    })
  }

  watch(() => user.value?.pos, (val) => {
    if (!val)
      return
    socket.emit('userMove', {
      socketId: user.value?.socketId,
      position: val,
    })
  })

  return {
    user,
    isLogin,
    userLogin,
    userLogout,
    userCheat,
  }
})
