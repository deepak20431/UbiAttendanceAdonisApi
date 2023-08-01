import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules } from '@ioc:Adonis/Core/Validator'
import BaseValidator from './BaseValidator'


export default class holidayValidator extends BaseValidator{
 constructor(protected ctx: HttpContextContract) {
  super()
 }

  static holidaySchema =schema.create({
    // id:schema.number([rules.unique({table:'practice',column:'id'})]),
    Name: schema.string([rules.alpha(),rules.maxLength(20),rules.minLength(2)]),
    Description: schema.string([rules.alpha(),rules.maxLength(20),rules.minLength(2)]),
    OrganizationId: schema.number(),
    DateFrom: schema.date.optional({format: 'yyyy-MM-dd'}),
    DateTo: schema.date.optional({format: 'yyyy-MM-dd'})

  })
  //  ,message:BaseValidator.messages
}



