import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class validateEmployeesList  extends BaseValidator{
  constructor(protected ctx: HttpContextContract) {
   super()
  }
    static newPostSchema = {schema:schema.create({
        orgid:schema.number(),
        empid:schema.number(),  
        pagename:schema.string(),
        currentPage:schema.number(),
        perPage:schema.number()
    }),messages:BaseValidator.messages
  }
 }