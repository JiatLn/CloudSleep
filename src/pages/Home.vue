<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { User } from '@/app/user'
import type { Bed } from '@/types'

const bedItems = ref<Bed[]>(
  Array.from({ length: 8 * 8 }, _ => ({
    position: [0, 0],
    isUsed: false,
  })),
)

const userList = ref<User[]>([
  new User([80, 60], 'user1'),
  new User([120, 40], 'user2'),
  new User([160, 60], 'user3'),
  new User([200, 40], 'user4'),
])

const userStore = useUserStore()
const { userInstance: me } = storeToRefs(userStore)

onMounted(() => {
  document.addEventListener('keydown', e => me.value.onKeyDown(e))
})
</script>

<template>
  <div h-full w-full flex="c col" all:transition-400>
    <div fixed right-2 top-2>
      My Position: ({{ me.pos.x }}, {{ me.pos.y }})
    </div>
    <div mb-8 italic font="mono" text="36px brand-primary">
      Welcome to Cloud Sleep~~
    </div>
    <div grid="~ cols-8 row-auto gap-40px" mx-auto>
      <div v-for="item, idx in bedItems" :key="idx" text="gray" w-50px h-50px i-iconoir:bed />
    </div>
    <TheUser :position="me.pos" />
    <TheUser v-for="user in userList" :key="user.name" :position="user.pos" />
  </div>
</template>

<style lang="less" scoped>
</style>
