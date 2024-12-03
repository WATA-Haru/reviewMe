<script setup lang="ts">
import { useUserInfoManager } from "@/stores/userInfoManager"
import { ref, type Ref } from "vue"
import {type userInfoType} from "../types/userInfo.ts"

const store = useUserInfoManager()
const userInfoRef: Ref<userInfoType> = ref(store.getUserInfo())

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
