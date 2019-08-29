/**
 * 如果不是简单的测试同步返回、测试异步返回，而是需要记录执行过程中的状态呢
 * 如下循环函数，内部的运行状态无法通过返回值知晓，此时需要mock函数
 */
exports.forEach = (arr, fn) => {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i < len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}