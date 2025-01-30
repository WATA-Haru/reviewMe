export const isHalfWidthCharNum = (value: string): boolean => {
  return !!value.match(/^[0-9]$/)
}
