<script setup lang="ts">
import ZipCodeInputContainer from '@/components/ZipCodeInput/container/index.vue'
import type { ZipCode } from '@/types/ZipCode'
import { fetchAddressFromZipCode } from '@/utils/fetchAddressFromZipCode'
import { ref } from 'vue'

defineOptions({
  name: 'FormContainer',
})

const addressRef = ref({
  address1: '',
  address2: '',
  address3: '',
})

/**
 * @description 子コンポーネントで入力された値を受け取り郵便番号APIにリクエストを行い、値が正しければrefにセットする
 */
const handleZipCode = async (zipcode: ZipCode) => {
  try {
    const response = await fetchAddressFromZipCode(zipcode)
    const result = response?.data?.results?.[0]

    if (!response) {
      throw new Error('fetch failed')
    }
    if (!result?.address1 || !result?.address2 || !result?.address3) {
      throw new Error('invalid zipcode: address not found')
    }
    addressRef.value.address1 = result.address1
    addressRef.value.address2 = result.address2
    addressRef.value.address3 = result.address3
  } catch (error) {
    console.error(error)
    return
  }
}
</script>

<template>
  <ZipCodeInputContainer @send-zipcode-from-zip-code-input="handleZipCode" />
  <div>
    {{ addressRef.address1 }}
    {{ addressRef.address2 }}
    {{ addressRef.address3 }}
  </div>
</template>
