import { ref } from "vue"
import { defineStore } from 'pinia'

export const useUserInfoManager = defineStore('userInfoManager', ()=> {
  const userInfo = ref('')
  return { userInfo }
})

