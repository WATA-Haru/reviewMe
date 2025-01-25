import { describe, test, beforeAll, afterEach, afterAll, expect } from 'vitest'
import { server } from '@/mocks/node'
import { fetchAddressFromZipCode } from '@/utils/fetchAddressFromZipCode/index.ts'
import { type ZipCode } from '@/types/ZipCode.ts'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('fetchAddressFromZipCode', () => {
  test('fetchAddressFromZipCodeが正常終了した際のstatusが200であること', async () => {
    const zipCode = '079-0177' as ZipCode
    const response = await fetchAddressFromZipCode(zipCode)
    expect(response?.data?.status).toBe(200)
  })
  test('fetchAddressFromZipCodeに空の文字列を渡した際のstatusが400であること', async () => {
    const response = await fetchAddressFromZipCode(null)
    expect(response?.data?.status).toBe(400)
  })
})
