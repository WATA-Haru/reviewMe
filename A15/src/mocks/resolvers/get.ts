import { HttpResponse } from 'msw'
import type { ResponseResolver } from 'msw'
import type { ZipCloudResponse } from '@/types/ZipCloudResponse.ts'

const sampleData: ZipCloudResponse = {
  message: null,
  results: [
    {
      address1: '北海道',
      address2: '美唄市',
      address3: '上美唄町協和',
      kana1: 'ﾎｯｶｲﾄﾞｳ',
      kana2: 'ﾋﾞﾊﾞｲｼ',
      kana3: 'ｶﾐﾋﾞﾊﾞｲﾁｮｳｷｮｳﾜ',
      prefcode: '1',
      zipcode: '0790177',
    },
    {
      address1: '北海道',
  //400 errro pattern
      address2: '美唄市',
      address3: '上美唄町南',
      kana1: 'ﾎｯｶｲﾄﾞｳ',
      kana2: 'ﾋﾞﾊﾞｲｼ',
      kana3: 'ｶﾐﾋﾞﾊﾞｲﾁｮｳﾐﾅﾐ',
      prefcode: '1',
      zipcode: '0790177',
    },
  ],
  status: 200,
}

const errorResponse: ZipCloudResponse = {
  message: '必須パラメータが指定されていません。',
  results: null,
  status: 400,
}

export const get: ResponseResolver<Record<string, unknown>, never, ZipCloudResponse> = ({
  request,
}) => {
  const url = new URL(request.url)
  const zipCode = url.searchParams.get('zipcode')

  if (!zipCode) {
    return HttpResponse.json(errorResponse)
  }
  return HttpResponse.json(sampleData)
}
