export default class BaseValidator {
   
     static messages = {
       '*':(field, rule) => {
           return `${rule} validation error on ${field}`
         },
         required: '{{ field }} is required its necessary',
         alpha:'Username not allowed',
         email:'Email is not available',
         unique:'Email should be Unique only',
         number:'It should be Number',
         mobile:'Phone_Number not allowed',
         minLength:'length is too short',
         mmaxLength:'length is too big'
     }
   }