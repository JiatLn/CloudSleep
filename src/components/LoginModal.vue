<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { LoginForm } from '@/types'

const userStore = useUserStore()
const { isLogin } = storeToRefs(userStore)

const showLoginModel = ref<boolean>(false)
const loginForm = ref<LoginForm>({
  username: '',
  sex: 'F',
  pos: {
    x: 80,
    y: 120,
  },
})

function onLogin() {
  if (!loginForm.value.username.trim()) {
    alert('Please enter your name')
    return
  }
  userStore.userLogin(loginForm.value.username, loginForm.value.pos, loginForm.value.sex)
  showLoginModel.value = false
  loginForm.value.username = ''
}
</script>

<template>
  <button v-if="!isLogin" btn @click="showLoginModel = true">
    Login
  </button>
  <button v-else btn @click="userStore.userLogout()">
    Logout
  </button>
  <Teleport to="body">
    <div v-if="showLoginModel" z-999 fixed top-0 left-0 right-0 bottom-0 w-100vw h-100vh bg="gray/50" grid="~" place-items-center>
      <div bg="white" w-500px p-8 rounded-16px flex="~ col" items-center justify-between>
        <div mb-3 flex="c" w-full relative>
          <div text="32px" uppercase>
            login
          </div>
          <div
            i-carbon-close text="24px gray" absolute top--1 right--1 cursor-pointer hover:transform="rotate-90" transition="all duration-300"
            @click="showLoginModel = false"
          />
        </div>
        <div w-full flex items-center>
          <label for="username" mr-3> Your Name </label>
          <input
            id="username"
            v-model="loginForm.username" v-focus
            placeholder="Enter your big name" type="text" border="~" flex-1
            outline-none p-2 @keydown.enter="onLogin"
          >
        </div>
        <div w-full flex="~ col" my-8>
          <div flex="c gap-30px">
            <div
              class="avater" :class="{ active: loginForm.sex === 'F' }"
              @click="loginForm.sex = 'F'"
            >
              <img src="@/assets/img/Boy.png" alt="boy">
            </div>
            <div
              class="avater" :class="{ active: loginForm.sex === 'M' }"
              @click="loginForm.sex = 'M'"
            >
              <img src="@/assets/img/Girl.png" alt="girl">
            </div>
          </div>
        </div>
        <button btn w-full py-2 @click="onLogin">
          Join Now
        </button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped lang="less">
.avater {
  width: 90px;
  height: 90px;
  border: 2px dashed darksalmon;
  border-radius: 8px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  &.active {
    background: darksalmon;
  }
}
</style>
