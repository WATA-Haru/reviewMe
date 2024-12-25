<script setup lang="ts">
import { useUserInfoManager } from "@/stores/userInfoManager"
import { ref, type Ref, onMounted } from "vue"
import {type userInfoType } from "../types/userInfo.ts"

const store = useUserInfoManager()
const returnedObj: Readonly<Ref<userInfoType>> = store.getUserInfo()
console.log(store.getUserInfo())
const userInfoRef: Ref<userInfoType> = ref({
  name: returnedObj.value.name,
  age: returnedObj.value.age,
  authority: returnedObj.value.authority,
})
</script>

<template>
  <main>
    <button><RouterLink to="./inputAuthority">Back Page</RouterLink></button>
    <h1>check inputs</h1>
    <h2>Name: {{ userInfoRef.name }}</h2>
    <h2>Age: {{ userInfoRef.age }}</h2>
    <h2>Authority: {{ userInfoRef.authority }}</h2>
  </main>
</template>
