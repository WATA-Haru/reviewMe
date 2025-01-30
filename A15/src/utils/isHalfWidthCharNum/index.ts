export const isHalfWidthCharNum = (value: string): boolean => {
  if (value.length !== 1) {
    throw Error('Value is not a single character')
  }
  return value.match(/^[0-9]$/) ? true : false
}
