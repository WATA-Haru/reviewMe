<script lang="ts">
import axios from 'axios';

const END_POINT = 'https://pokeapi.co/api/v2/pokemon/'
//"https://instability.vercel.app/"

//axios.get(END_POINT)
//  .then(function(response) {
//    console.log(response)
//  })

const axiosInstance = axios.create({
  baseURL: END_POINT,
  headers: {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
  },
})

type typeResponse = {
  status: 200 | 500 | 503; //リテラルユニオンでできる...!!
  message: string;
}

// まずerrorの種類ちゃんと覚える
// vercelは200か500エラーを返す
// 400系は自分で探せ!
axiosInstance.get(END_POINT) //使い方覚える
  .then(function(response) {
    console.log(response)
  })
  .catch(function(error) {
    console.log(error)
  })

const isResponseTypeResponse = <T extends Record<string, unknown>>(response): response is T => {
    if (typeof response !== 'object') {
      return ;
    }
    return 'status' in response && 'message' in response &&
    response.status === 200 || response.status === 500 || response.string === 503  && typeof response.message === 'string'
}

const response: unknown = {
  status: 200,
  message: 'success'
}

if (isResponseTypeResponse<typeResponse>(response)) {
  console.log(response.status)
}

//Tがrecord型のstring, anyを継承
//デメリットは、中の処理がちゃんとしているかに依存する
// type guard関数 <> infer

const createError = (response: unknown) => {
  if (typeof response === 'object') {
    if ('status' in response && 'message' in response &&
    typeof response.status === 'number' && typeof response.message === 'string' ) {
      console.log((response as typeResponse).status)
      // ここまで絞り込んでtypeResponseを出すので安全性がないコードではない
    }
  }


}


</script>

<template>

<h1>hohoge</h1>

</template>
