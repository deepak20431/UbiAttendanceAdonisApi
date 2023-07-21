import { schema, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'
export default class GetMultiShiftsListValidator {
  constructor(protected ctx: HttpContextContract) {}

  
  static getmultishiftlist = {schema:schema.create({
    EmployeeId:schema.number(),
    OrganizationId:schema.number(),
  }),message:BaseValidator.messages
  } 
}
