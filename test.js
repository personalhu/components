class myPromise {
  constructor(callback) {
    this.msg = ''
    this.success = null
    this.fail = null
    this.queue = []
    callback(success => {
      this.success = success
      this.msg = 'SUCCESS'
      this.queue.forEach(item => {
        item.res(success)
      })
    }, fail => {
      this.fail = fail
      this.msg = 'FAIL'
      this.queue.forEach(item => {
        item.rej(this.success)
      })
    })
  }

  then(fullFn, fail) {
    return new myPromise((resFn, rejFn) => {
      if (this.msg === 'SUCCESS') {
        handle(this.success)
      } else if (this.msg === 'FAIL') {
        fail(this.fail)
      } else {
        this.queue.push({
          res: success,
          rej: fail
        })
      }
      function handle(value) {
        let reaValue = (fullFn instanceof Function && success(value) || value)

        if (reaValue && reaValue.then instanceof Function) {
          reaValue.then(
            res => {
              resFn(res)
            },
            fail => {
              rejFn(fail)
            }
          )
        } else {
          resFn(reaValue)
        }
      }
    })
  }

}