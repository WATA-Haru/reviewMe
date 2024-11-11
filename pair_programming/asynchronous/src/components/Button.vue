<script setup lang="ts">
// import { defineProps, defineEmits } from 'vue'

const props = defineProps<{
  emitName: string
}>()
const emit = defineEmits()

const handleClick = () => {
  emit(props.emitName)
}
</script>

<template>
  <button class="vue-button" @click="handleClick">
    <slot></slot>
  </button>
</template>

<style lang="css" scoped>
.vue-button {
  width: 100px;
  height: 50px;
  border-radius: 30px;
  border: none;
  background-color: #f3f313;
  font-size:20px;
}

</style>
