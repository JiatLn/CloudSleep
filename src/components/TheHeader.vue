<script setup lang="ts">
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const { user, isLogin } = storeToRefs(userStore)

function toGithub() {
  window.open('https://github.com/JiatLn/CloudSleep', '_blank')
}
</script>

<template>
  <div h-60px px-4 py-1 border-b flex="~" items-center justify-between>
    <div text="24px">
      ☁️💤
    </div>
    <div flex="c gap-4">
      <div v-if="isLogin">
        <div v-show="!user?.isSleeping" text="#333">
          My Position: ({{ user!.pos.x }}, {{ user!.pos.y }})
        </div>
        <button v-show="user?.isSleeping" btn @click="user?.onSleep(-1)">
          Wake up
        </button>
      </div>
      <LoginModal />
      <div i-bi:github text="24px gray" hover="text-brand-primary" cursor-pointer @click="toGithub" />
    </div>
  </div>
</template>

<style scoped lang="scss">
</style>
