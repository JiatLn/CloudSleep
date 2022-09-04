import { io } from 'socket.io-client'
import { storeToRefs } from 'pinia'
import type { IPeopleInfo } from '@/store'

const socket = io('http://localhost:3000')

export function initSocket() {
  socket.on('connect', () => {
    console.log('connect', socket.id) // x8WIv7-mJelg7on_ALbx
  })

  socket.on('welcome', (data: IPeopleInfo[]) => {
    console.log(data)
    const peopleStore = usePeopleStore()
    peopleStore.cleanUp()
    for (const item of data) {
      peopleStore.addUser(item)
    }
  })

  socket.on('your-socket-id', (socketId: string) => {
    const store = useUserStore()
    const { user } = storeToRefs(store)
    if (user.value) {
      user.value.socketId = socketId
    }
  })

  socket.on('[server](userDisconnect)', (socketId: string) => {
    const peopleStore = usePeopleStore()
    peopleStore.deleteUser(socketId)
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)
    if (user.value && user.value.socketId === socketId) {
      userStore.userLogout()
    }
  })

  socket.on('[server](addUser)', (data) => {
    const peopleStore = usePeopleStore()
    const userStore = useUserStore()
    const { user } = storeToRefs(userStore)

    console.log(data)
    peopleStore.addUser(data)
    user.value && socket.emit('[client](addUser)', user.value.socketId)
  })

  socket.on('[server](userMove)', (data) => {
    const peopleStore = usePeopleStore()
    peopleStore.updateUser(data.name, { pos: data.position })
  })

  let timer: any = null
  socket.on('[server](userCheat)', (data) => {
    const { userName, msg } = data
    const peopleStore = usePeopleStore()
    const user = peopleStore.getUserByName(userName)!
    user.message = msg
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      user.message = ''
    }, 3000)
  })
}

export {
  socket,
}
