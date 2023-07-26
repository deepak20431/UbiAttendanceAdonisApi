export default class BaseValidator {

  static messages = {
      '*':(field, rule) => {
          return `${rule} validation error on ${field}`
        },
        required: '{{ field }} is required',
        'orgId.number':'orgId can only contain Number type Values!',
        number:'Field can only contain Number type Values!',
        maxLength:'Length cant be max then 22 characters'
       
      }
}