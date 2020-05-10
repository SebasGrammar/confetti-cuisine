let name = 'object'

let outer = {
  [name]: 'outer',
  ignore() {
    let inner = {
      [name]: 'inner',
      arrow: () => {
        console.log(this)
      },
      named() {
        console.log(this)
      },
    }
    inner.named()
    inner.arrow()
  },
  trigger() {
    this.ignore()
  },
}

// outer.trigger()

exports.outer = outer