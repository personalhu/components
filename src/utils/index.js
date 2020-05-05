export const debounce = function (fn, delay = 500) {
  let timer = null
  return function () {
    const _this = this
    const args = arguments
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(_this, args)
    }, delay)
  }
}

export const type = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1)
}
