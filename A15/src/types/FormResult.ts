import { type ZipCode } from '@/types/ZipCode.ts'
import { type PrefCode } from '@/types/PrefCode.ts'
import { type PrefName } from '@/types/PrefName.ts'

export type FormResult = {
  zipCode?: ZipCode
  prefcode?: PrefCode
  prefname?: PrefName
  address2?: string
}
