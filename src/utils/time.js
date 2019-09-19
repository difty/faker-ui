export const getArray = function(start, end) {
  let arr = []
  for (let i = start; i <= end; i++) {
    arr.push(i)
  }
  return arr
}

export function setRangeData(arr, start, end, value) {
  for (let i = start; i < end; i++) {
    arr[i] = value;
  }
}
