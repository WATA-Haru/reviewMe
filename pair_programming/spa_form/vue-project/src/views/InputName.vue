<script setup lang="ts">
import { useUserInfoManager } from '../stores/userInfoManager';
import { ref, watch } from 'vue'
import { type Ref } from 'vue'


const nameRef: Ref<string> = ref('')
const store = useUserInfoManager()

watch(nameRef, () => {
  store.setUserInfo({name: nameRef.value})
})
</script>

<template>
  <main>
    <h1>inputName</h1>

    <form>
      <input v-model="nameRef" type="string">
    </form>
    <RouterLink to="./inputAge">Next Page(Age)</RouterLink>
  </main>
</template>
