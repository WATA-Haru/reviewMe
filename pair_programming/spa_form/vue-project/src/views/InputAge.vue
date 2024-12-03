<script setup lang="ts">
import { useUserInfoManager } from '../stores/userInfoManager';
import { ref, watch } from 'vue'
import { type Ref } from 'vue'


const ageRef: Ref<number> = ref(0)
const store = useUserInfoManager()

watch(ageRef, () => {
  store.setUserInfo({age: ageRef.value})
})
</script>

<template>
  <main>
    <button><RouterLink to="./">Back Page</RouterLink></button>

    <h1>inputAge</h1>
    <form>
      <input v-model="ageRef" type="number">
    </form>
    <RouterLink to="./inputAuthority">Next Page(authority)</RouterLink>
  </main>
</template>
