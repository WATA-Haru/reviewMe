import { ref } from "vue"
import {type Ref } from "vue"
import { defineStore } from 'pinia'
import { type userInfoType } from '../types/userInfo.ts'

export const useUserInfoManager = defineStore('info-manager', ()=> {
  const userInfo: Ref<userInfoType> = ref({
    name: undefined,
    age: undefined,
    authority: undefined
  })

  const setUserInfo = ({name, age, authority}: userInfoType):void => {
    userInfo.value.name = name
    userInfo.value.age = age
    userInfo.value.authority = authority
  }

  const getUserInfo = ():Ref<userInfoType> => {
    return userInfo
  }
  return { userInfo, setUserInfo, getUserInfo}
})

