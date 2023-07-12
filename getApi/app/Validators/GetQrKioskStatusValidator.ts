import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'

export default class GetQrKioskStatusValidator {
  constructor(protected ctx: HttpContextContract) {}

  static GetQrschema = {schema:schema.create({
    OrganizationId:schema.number(),
    EmployeeId:schema.number()
  }),message:BaseValidator.messages
  }
  
}
