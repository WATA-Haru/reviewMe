<script setup lang="ts">
import { useUserInfoManager } from '../stores/userInfoManager';
import { ref, watch } from 'vue'
import { type Ref } from 'vue'

const authRef: Ref<string> = ref('')
const store = useUserInfoManager()

watch(authRef, () => {
  if (authRef.value != '') {
    if (authRef.value === "root" || authRef.value === "owner" ||authRef.value === "group") {
      store.setUserInfo({authority: authRef.value})
    }
  }
})
</script>

<template>
  <main>
    <button><RouterLink to="./inputAge">Back Page(authority)</RouterLink></button>

    <h1>inputAuth</h1>
    <form>
      <select name="authRef" v-model=authRef>
        <option value="root">root</option>
        <option value="owner">owner</option>
        <option value="group">group</option>
      </select>
    </form>
    <RouterLink to="./checkInputs">Next Page(Check)</RouterLink>
  </main>
</template>

