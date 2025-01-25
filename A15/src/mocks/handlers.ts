import { http } from 'msw'
import { mocks } from '@/mocks/resolvers/mocks'
import { zipCloudURLWrapper } from '@/utils/zipCloudURLWrapper/index.ts'

export const handlers = [http.get(zipCloudURLWrapper(), mocks.get)]
