import { zipCloudURLWrapper } from '@/utils/zipCloudURLWrapper/index.ts'
import axios from 'axios'
import { type AxiosResponse } from 'axios'
import { type ZipCloudResponse } from '@/types/ZipCloudResponse.ts'
import { type ZipCode } from '@/types/ZipCode.ts'

const instance = axios.create({
  baseURL: zipCloudURLWrapper(''),
})

export const getAddressFromZipCode = async (
  zipCode: ZipCode | null,
): Promise<AxiosResponse<ZipCloudResponse, never> | void> => {
  try {
    if (zipCode === null) {
      return await instance.get('')
    }
    return await instance.get(`?zipcode=${zipCode}`)
  } catch (error) {
    console.error(error)
  }
}
