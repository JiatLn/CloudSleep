import { defineStore } from 'pinia'
import { User } from '@/app/user'

export interface IUserInfo {
  position: [number, number]
  name: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | undefined>()

  function userLogin(name: string, position: [number, number]) {
    user.value = new User(position, name)
    window.addEventListener('keydown', e => user.value?.onKeyDown((e)))
  }

  return {
    user,
    userLogin,
  }
})
