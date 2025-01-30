export const isFullWidthCharNum = (value: string): boolean => {
  if (value.length !== 1) {
    throw Error('Value is a not single character')
  }
  return !!value.match(/^[０-９]$/)
}
