import { defineStore } from 'pinia'
import { User } from '@/app/user'
import type { Pos } from '@/types'

export interface IUserInfo {
  position: Pos
  name: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<User | undefined>()

  function userLogin(name: string, position: Pos) {
    user.value = new User(position, name)
    window.addEventListener('keydown', e => user.value?.onKeyDown((e)))
    const store = usePeopleStore()
    store.addUser('dddd', user.value)
  }

  watchThrottled(() => user.value?.pos, (val) => {
    if (!val)
      return
    console.log('user now at: ', val)
  }, { throttle: 500 })

  return {
    user,
    userLogin,
  }
})
