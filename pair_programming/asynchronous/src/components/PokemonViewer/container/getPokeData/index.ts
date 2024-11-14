import { POKEAPI_URL } from '@/const/constValues'
/**
 * @description PokeAPIからポケモンのデータをfetchして取得する。取得できなかった場合はnullを返す。
 *
 */
export const getPokeData = async function (
  pokeNum: number,
): Promise<object | null> {
  const baseURL: string = POKEAPI_URL
  try {
    const response = await fetch(baseURL + pokeNum.toString())
    if (!response.ok) {
      throw new Error(
        `response.status=${response.status}, response.statusText = ${response.statusText}`,
      )
    }
    const data = await response.json()
    return data
  } catch (error) {
    console.log(error)
    return null
  }
}
