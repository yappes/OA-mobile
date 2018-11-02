import Validator from 'async-validator'

class AsyncValidator {
  constructor(data, rule) {
    this.data = data
    this.rule = rule
    this.validator = new Validator(rule)
  }

  validate() {
    return new Promise((res, rej) => {
      this.validator.validate(this.data, (error, field) => {
        if(error) {
          rej(error)
        } else {
          res()
        }
      })
    })
  }
}

export default AsyncValidator