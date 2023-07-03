export default class BaseValidator {
   

     static messages = {
       '*':(field, rule) => {
           return `${rule} validation error on ${field}`
         },
         required: '{{ field }} is required',
         alpha:'Username not allowed',
         email:'Email is not available',
         unique:'Email should be Unique only',
         number:'Number is should have 10-digit',
         mobile:'Phone_Number not allowed',
         minLength:'length is too short',
         mmaxLength:'length is too big'
     }
   }