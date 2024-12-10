import { ref, readonly } from "vue"
import { type Ref } from "vue"
import { defineStore } from 'pinia'
import { type userInfoType } from '../types/userInfo.ts'

export const useUserInfoManager = defineStore('info-manager', ()=> {
  const userInfo: Ref<userInfoType> = ref({
    name: undefined,
    age: undefined,
    authority: undefined
  })

  //const setUserInfo = (info: Partial<userInfoType>):void => {
  //  userInfo.value = { ...userInfo.value, ...info }
  //}
  //

  //**before
  //const setUserInfo = ({name, age, authority}: userInfoType):void => {
  //  userInfo.value.name = name
  //  userInfo.value.age = age
  //  userInfo.value.authority = authority
  //}

  //**after
  const setUserInfo = ({name, age, authority}: userInfoType):void => {
    if (name) {
      userInfo.value.name = name
    }
    if (age) {
      userInfo.value.age = age
    }
    if (authority) {
      userInfo.value.authority = authority
    }
  }

  const getUserInfo = ():Readonly<Ref<userInfoType>> => {
    return readonly(userInfo)
  }
  return { setUserInfo, getUserInfo}
})

