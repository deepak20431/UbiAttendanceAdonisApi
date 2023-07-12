import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class getLastTimeOutValidator  {
    constructor(protected ctx: HttpContextContract) {}
  
    static getLasttimeOutschema = {schema:schema.create({
      OrganizationId:schema.number(),
      EmployeeId:schema.number(),
      AttendanceDate:schema.date()
      
    }),message:BaseValidator.messages
    }
    
  }
  