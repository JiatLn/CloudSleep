<script setup lang="ts">
import { storeToRefs } from 'pinia'

const content = ref<string>('')

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

function onSend() {
  if (content.value) {
    userStore.userCheat(content.value)
    content.value = ''
  }
}
</script>

<template>
  <div flex items-center fixed bottom-2 left-2 w-full max-w-800px>
    <input
      v-model.trim="content" v-focus border="~ brand-primary"
      flex-1 px-3 py-2 outline-none text="black 14px" @keydown.enter="onSend"
      placeholder="💭 Type in what you want to say~">
    <button btn rounded-none h-39px px-5 border-l-none @click="onSend">
      Send
    </button>
  </div>
</template>

<style scoped lang="less">
</style>
