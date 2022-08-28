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

export {
  socket,
}
