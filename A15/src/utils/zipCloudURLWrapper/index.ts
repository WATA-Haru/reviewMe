export const zipCloudURLWrapper = (path: string | null = null): string => {
  const base = 'https://zipcloud.ibsnet.co.jp/api/search/'

  if (path === null || path === '') {
    return new URL(base).toString()
  } else {
    return new URL(path, base).toString()
  }
}

