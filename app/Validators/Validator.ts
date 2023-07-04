import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
//import { rules } from '@ioc:Adonis/Core/Validator'
import BaseValidator from './BaseValidator'


export default class Validator extends BaseValidator{
 constructor(protected ctx: HttpContextContract) {
  super()
 }

  static newPostSchema = {schema:schema.create({
    orgId:schema.number(),
   
  })
}
}



