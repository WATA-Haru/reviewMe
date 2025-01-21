import { PREF_CODE_NAME_MAP } from '@/constants/PREF_CODE_NAME_MAP.ts'

export type PrefName = (typeof PREF_CODE_NAME_MAP)[keyof typeof PREF_CODE_NAME_MAP]
