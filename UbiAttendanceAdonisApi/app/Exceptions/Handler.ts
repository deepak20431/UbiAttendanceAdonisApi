import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExceptionHandler extends HttpExceptionHandler {
  constructor () {
    super(Logger)
  }

  public async handle(error: any, ctx: HttpContextContract) {

    if(error.code == 'ER_BAD_FIELD_ERROR'){
      return ctx.response.status(500).send('No such field in table employee')
     }

     if(error.code == "ER_NO_SUCH_TABLE"){
      return ctx.response.status(500).send(error.sqlMessage)
     }

     if(error.code == 'E_VALIDATION_FAILURE'){
      return ctx.response.status(200).send(error.messages)
     }
 
  }
}
