<script setup lang="ts">
import axios from 'axios'
import { END_POINT } from '@/const/values'
import { onMounted, ref } from 'vue'
import { type Ref } from 'vue'

defineOptions({
  name: 'HandleAPIResponse',
})

const message: Ref<string> = ref('')

type typeResponse = {
  status: 200 | 404 | 500
  statusText: string
}

const axiosInstance = axios.create({
  baseURL: END_POINT,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const getFromAPI = async () => {
  await axiosInstance
    .get('')
    .then((response) => {
      if (isResponseTypeResponse<typeResponse>(response.data)){
        if (response.data.status === 200){
          message.value = '200 ok'
        }
      }
    })
    .catch((error) => {
      if (isResponseTypeResponse<typeResponse>(error.response.data)){
        if (error.response.data.status === 404){
          message.value = '404 not found'
        }
        if (error.response.data.status === 500){
          message.value = '500 server error'
        }
      }
    })
    .finally(() => {})
}

const isResponseTypeResponse = <T extends Record<string, unknown>>(
  response: unknown,
): response is T => {
  if (typeof response !== 'object' || !response) {
    console.log(response)
    return false
  }
  return (
    'status' in response &&
    (response.status === 200 || response.status === 404 || response.status === 500)
  )
}

</script>

<template>
  <button @click="getFromAPI">GET</button>
  <h1>{{ message }}</h1>
</template>
