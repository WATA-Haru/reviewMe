export const zipCloudURLWrapper = (path: string | null = null): string => {
  const base = import.meta.env.VITE_ZIP_API_URL

  if (path === null || path === '') {
    return new URL(base).toString()
  } else {
    return new URL(path, base).toString()
  }
}
