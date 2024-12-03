import { ref } from "vue"
import { defineStore } from 'pinia'
import { type userInfo } from '../types/userInfo.ts'

export const useUserInfoManager = defineStore('userInfoManager', ()=> {
  const userInfo: userInfo = {
    name: undefined,
    age: undefined,
    authority: undefined
  }

  const setUserInfo = ({name, age, authority}: userInfo):void => {
    userInfo.name = name
    userInfo.age = age
    userInfo.authority = authority
  }

  return { userInfo, setUserInfo}
})

