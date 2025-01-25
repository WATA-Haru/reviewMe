import { zipCloudURLWrapper } from '@/utils/zipCloudURLWrapper/index.ts'
import axios from 'axios'
import { type AxiosResponse } from 'axios'
import { type ZipCloudResponse } from '@/types/ZipCloudResponse.ts'
import { type ZipCode } from '@/types/ZipCode.ts'

const instance = axios.create({
  baseURL: zipCloudURLWrapper(''),
})

export const fetchAddressFromZipCode = async (
  zipCode: ZipCode | null,
): Promise<AxiosResponse<ZipCloudResponse, never> | void> => {
  if (zipCode === null) {
    throw new Error('zipCode is null')
  }
  try {
    return await instance.get(`?zipcode=${zipCode}`)
  } catch (error) {
    throw error
  }
}
