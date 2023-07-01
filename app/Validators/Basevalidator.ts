export default class BaseValidator {
   
    static messages = {
      '*':(field, ) => {
          return `validation error on ${field}`
        },
        required: '{{ field }} is required'
    }
  }