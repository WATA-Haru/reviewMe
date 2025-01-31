export const isFullWidthCharNum = (value: string): boolean => {
  return !!value.match(/^[０-９]$/)
}
