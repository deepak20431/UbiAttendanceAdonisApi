import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class loginValidator  extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
    super()

  }

    static loginV ={
  
   schema:schema.create({
    userName: schema.string(),
    password: schema.string(),
    loginMethod:schema.string.optional(),
    OrgId:schema.number.optional()
    
    })
  }
}