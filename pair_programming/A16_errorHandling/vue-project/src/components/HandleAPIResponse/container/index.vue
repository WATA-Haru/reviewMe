<script setup lang="ts">
defineOptions({
  name: 'HandleAPIResponse',
})

import axios from 'axios'
import { END_POINT } from '@/const/values'
import { onMounted, ref } from 'vue'
import { type Ref } from 'vue'

const message: Ref<string> = ref('')

type typeResponse = {
  status: 200 | 404 | 500
  message: string
}

const axiosInstance = axios.create({
  baseURL: END_POINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

async function getFromAPI() {
  await axiosInstance
    .get('')
    .then((response) => {
      message.value = 'hoge'
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {})
}

onMounted(async () => {
  await getFromAPI()
})

// まずerrorの種類ちゃんと覚える
// vercelは200か500エラーを返す
// 400系は自分で探せ!
//axiosInstance
//  .get(END_POINT) //使い方覚える
//  .then(function (response) {
//    console.log(response)
//  })
//  .catch(function (error) {
//    console.log(error)
//  })

//const isResponseTypeResponse = <T extends Record<string, unknown>>(response): response is T => {
//  if (typeof response !== 'object') {
//    return
//  }
//  return (
//    ('status' in response && 'message' in response && response.status === 200) ||
//    response.status === 500 ||
//    (response.string === 503 && typeof response.message === 'string')
//  )
//}
//
//const response: unknown = {
//  status: 200,
//  message: 'success',
//}
//
//if (isResponseTypeResponse<typeResponse>(response)) {
//  console.log(response.status)
//}

//Tがrecord型のstring, anyを継承
//デメリットは、中の処理がちゃんとしているかに依存する
// type guard関数 <> infer

//const createError = (response: unknown) => {
//  if (typeof response === 'object') {
//    if (
//      'status' in response &&
//      'message' in response &&
//      typeof response.status === 'number' &&
//      typeof response.message === 'string'
//    ) {
//      console.log((response as typeResponse).status)
//      // ここまで絞り込んでtypeResponseを出すので安全性がないコードではない
//    }
//  }
//}
</script>

<template>
  <button @click="getFromAPI">GET</button>
  <h1>{{ message }}</h1>
</template>
