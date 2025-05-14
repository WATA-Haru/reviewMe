<script setup lang="ts">
import ZipCodeInputContainer from '@/components/ZipCodeInput/container/index.vue'
import type { ZipCode } from '@/types/ZipCode'
import { fetchAddressFromZipCode } from '@/utils/fetchAddressFromZipCode'
import { ref } from 'vue'

defineOptions({
  name: 'FormContainer',
})

/**
 * @description
 * 郵便番号検索APIから取得したaddress1, address2, address3を
 * addressPrefecture, addressCity, addressNeighborhood に対応付けて格納
 */
const addressRef = ref({
  addressPrefecture: '',
  addressCity: '',
  addressNeighborhood: '',
})

/**
 * @description 子コンポーネントで入力された値を受け取り郵便番号APIにリクエストを行い、値が正しければrefにセットする
 */
const handleZipCode = async (zipcode: ZipCode) => {
  try {
    const response = await fetchAddressFromZipCode(zipcode)
    const result = response?.data?.results?.[0]

    if (!result?.address1 || !result?.address2 || !result?.address3) {
      throw new Error('invalid zipcode: address not found')
    }
    addressRef.value.addressPrefecture = result.address1
    addressRef.value.addressCity = result.address2
    addressRef.value.addressNeighborhood = result.address3
  } catch (error) {
    // TODO: API 通信が失敗した際は失敗した旨が画面上でわかるようにする（見た目はこだわらない）例外対応の実装をする
    console.error(error)
    return
  }
}
</script>

<template>
  <ZipCodeInputContainer @send-zipcode-from-zip-code-input="handleZipCode" />
  <div>
    {{ addressRef.addressPrefecture }}
    {{ addressRef.addressCity }}
    {{ addressRef.addressNeighborhood }}
  </div>
</template>
