import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class loginValidator  extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super()

  }

    static loginV ={
    schema:schema.create({
    userName: schema.string.optional(),
    password: schema.string.optional(),
    // loginMethod:schema.string.optional(),
    token:schema.string.optional()
    
    })
  }
}