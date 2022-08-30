<script setup lang="ts">
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user: me } = storeToRefs(userStore)

const showLoginModel = ref<boolean>(false)
const loginForm = ref({
  username: '',
})

function onLogin() {
  if (!loginForm.value.username.trim()) {
    alert('Please enter your name')
    return
  }
  showLoginModel.value = false
  userStore.userLogin(loginForm.value.username, {
    x: 20,
    y: 30,
  })
}
</script>

<template>
  <button v-if="!me" btn @click="showLoginModel = true">
    Login
  </button>
  <button v-else btn @click="userStore.userLogout()">
    Logout
  </button>
  <Teleport to="body">
    <div v-if="showLoginModel" z-999 fixed top-0 left-0 right-0 bottom-0 w-100vw h-100vh bg="gray/50" grid="~" place-items-center>
      <div bg="white" w-500px h-320px p-8 rounded-16px flex="~ col" items-center justify-between>
        <div mb-3 flex="c" w-full relative>
          <div text="32px" uppercase>
            login
          </div>
          <div
            i-carbon-close text="24px gray" absolute top--1 right--1 cursor-pointer hover:transform="rotate-90" transition="all duration-300"
            @click="showLoginModel = false" />
        </div>
        <div>
          <label for="username" mr-3> Your Name </label>
          <input
            id="username" v-model="loginForm.username"
            v-focus placeholder="Enter your big name" type="text"
            border="~" outline-none p-2>
        </div>
        <button btn w-full py-2 @click="onLogin">
          Join Now
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="scss">
</style>
