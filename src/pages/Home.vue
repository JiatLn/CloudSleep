<script setup lang="ts">
import { storeToRefs } from 'pinia'

const peopleStore = usePeopleStore()
const { otherUserList } = storeToRefs(peopleStore)

const userStore = useUserStore()
const { user: me, isLogin } = storeToRefs(userStore)

onMounted(() => {
  if (me.value) {
    userStore.userLogin(me.value.name, me.value.pos)
  }
})
</script>

<template>
  <div h-full w-full flex="c col" all:transition-400>
    <TheBed />
    <TheUser v-if="isLogin" :pos="me!.pos" :name="me!.name" :message="me?.message" :is-sleeping="me?.isSleeping" />
    <TheUser
      v-for="user in otherUserList" :key="user.name"
      :pos="user.pos" :name="user.name" />
    <CheatInput v-if="isLogin" />
  </div>
</template>

<style lang="less" scoped>
</style>
