import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'
import { rules } from '@ioc:Adonis/Core/Validator'

export default class EmpMasterValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  static EmpMasterschema = {schema:schema.create({
    OrganizationId:schema.number([
      rules.required()
    ]),
    pageName:schema.string([
      rules.required()
    ]),
    currentPage:schema.string([
      rules.required()
    ]),
    perPage:schema.string([
      rules.required()
    ])
  }) ,message:BaseValidator.messages
    
}
}