/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/
// import UnAuthorized from 'App/Exceptions/UnAuthorizedException'



import Logger from '@ioc:Adonis/Core/Logger'
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class ExceptionHandler extends HttpExceptionHandler {
  // protected statusPages = {
  //   '404': 'errors/not-found',
  //   '500..599': 'errors/server-error',
  // }
  constructor () {
    super(Logger)
  }
  public async handle(error: any, ctx: HttpContextContract) {
   
    if (error.code === 'E_VALIDATION_FAILURE') {
      return ctx.response.status(422).send(error.messages)
    }
    if (error.code === 'ECONNREFUSED') {
      return ctx.response.status(500).send('Connection Required with Xampp')
    }
    if (error.code === 'ER_NO_SUCH_TABLE') {
      return ctx.response.status(500).send(error)
    }
    if (error.code === 'E_ROW_NOT_FOUND') {
      return ctx.response.status(500).send('Row Not Found in databse Sory')
    }
    // if(error.code === 'ER_NO_SUCH_TABLE'){
      
    //   const message = 'You are not deal with coorect table_name'
    //   const status = 500
    //   const errorCode = 'ER_NO_SUCH_TABLE'
    //   // return ctx.response.status(500).send(error.message)
    //   throw new UnAuthorized(message, status, errorCode)
    // }
  }

  }



