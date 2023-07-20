import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UservalidationValidator {
  constructor(protected ctx: HttpContextContract) {}

  
   
  
  static  postSchema = {schema:schema.create({
    iam:schema.number(),
        TimeOutCity:schema.string([rules.alpha()])



  
  })
}
}