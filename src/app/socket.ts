import { io } from 'socket.io-client'

const socket = io('http://localhost:3000')

socket.on('connect', () => {
  console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on('[server](userDisconnect)', (data) => {
  const peopleStore = usePeopleStore()
  peopleStore.deleteUser(data)
})

socket.on('[server](addUser)', (data) => {
  const peopleStore = usePeopleStore()
  peopleStore.addUser(data)
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

export {
  socket,
}
