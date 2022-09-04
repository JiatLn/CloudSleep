<script setup lang="ts">
import { socket } from '@/app/socket'
import Layout from '@/layout/index.vue'

socket.emit('hello-world')
</script>

<template>
  <Layout />
</template>

<style lang="less" scoped>
</style>
