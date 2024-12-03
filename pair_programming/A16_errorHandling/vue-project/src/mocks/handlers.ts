import { http, HttpResponse } from 'msw'
import { END_POINT } from '../const/values'

const createZeroToLengthArray = (max: number): number[] => {
  return [...Array(max)].map((__, i) => i)
}

type zeroToLength<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number] // numberでアクセスしてunion型にする
  : zeroToLength<N, [...Acc, Acc['length']]>

const getRandomInt = <N extends number>(max: N): zeroToLength<N> => {
  return Math.floor(Math.random() * max) as zeroToLength<N>
}

const responseList: { status: number, statusText: string }[] = [
  {
    status: 200,
    statusText: 'ok'
  },
  {
    status: 404,
    statusText: 'notFoundError'
  },
  {
    status: 500,
    statusText: 'serverError'
  }
]

/**
 * @description - return response according to the randomNum
 */
export const handlers = [
  http.get(END_POINT, () => {
    const errorPatternNum = 3;
    const zeroToLengthArray = createZeroToLengthArray(errorPatternNum)
    const randomNum: zeroToLength<typeof errorPatternNum> = getRandomInt(errorPatternNum);

    const [response] = zeroToLengthArray.filter(index => index === randomNum).map(index => responseList[index])
    return response
      ? HttpResponse.json(response, { status: response.status, statusText: response.statusText })
      : undefined
  }),
]
