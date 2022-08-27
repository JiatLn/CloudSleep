import { defineStore } from 'pinia'
import { User } from '@/app/user'

export interface IUserInfo {
  position: [number, number]
  name: string
}

export const useUserStore = defineStore('user', () => {
  const user = ref<IUserInfo>({
    position: [20, 30],
    name: 'John Doe',
  })

  const userInstance = ref<User>(new User(user.value.position, user.value.name))

  return {
    user,
    userInstance,
  }
})
