import { schema, } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './Basevalidator'

export default class Validator1Validator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }


  
  static  postSchema = {schema:schema.create({
    OrganizationId:schema.number()
   


  }),message:BaseValidator.messages
}
}
