export type ZipCloudResponse = {
  message: string | null
  results: ZipCloudResult[] | null
  status: 200 | 400 | 500
}

type ZipCloudResult = {
  zipcode: string | null
  prefcode: string | null
  address1: string | null
  address2: string | null
  address3: string | null
  kana1: string | null
  kana2: string | null
  kana3: string | null
}
