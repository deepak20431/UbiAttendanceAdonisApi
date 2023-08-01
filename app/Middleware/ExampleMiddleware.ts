import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ExampleMiddleware {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    console.log("HEHHEHE");
    
    // return "OM CHAUHAN"
    await next()
    console.log("DEEPAk")
  }
}
