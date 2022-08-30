<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Bed } from '@/types'

const bedItems = ref<Bed[]>(
  Array.from({ length: 8 * 8 }, _ => ({
    position: {
      x: 0,
      y: 0,
    },
    isUsed: false,
  })),
)

const peopleStore = usePeopleStore()
const { otherUserList, userList } = storeToRefs(peopleStore)

const userStore = useUserStore()
const { user: me } = storeToRefs(userStore)

onMounted(() => {
  if (me.value) {
    userStore.userLogin(me.value.name, me.value.pos)
  }
})
</script>

<template>
  <div h-full w-full flex="c col" all:transition-400>
    <div v-if="me?.pos" fixed right-2 top-2>
      My Position: ({{  me.pos.x  }}, {{  me.pos.y  }})
    </div>
    <div mb-8 flex="c" gap-3>
      <div italic font="mono" text="36px brand-primary">
        Welcome to Cloud Sleep~~
      </div>
      <LoginModal />
    </div>
    <div grid="~ cols-8 row-auto gap-40px" mx-auto>
      <div v-for="item, idx in bedItems" :key="idx" text="gray" w-50px h-50px i-iconoir:bed />
    </div>
    <TheUser
      v-if="me"
      :pos="me.pos" :name="me.name" />
    <TheUser
      v-for="user in otherUserList" :key="user.name"
      :pos="user.pos" :name="user.name" />
  </div>
</template>

<style lang="less" scoped>
</style>
