import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class getAttendancebothValidator  {
    constructor(protected ctx: HttpContextContract) {}
  
    static getAttendancebothschema = {schema:schema.create({
      OrganizationId:schema.number(),
      EmployeeId:schema.number.optional(),
      date: schema.date.optional({
        format: 'yyyy-MM-dd',
      })      
    }),message:BaseValidator.messages
    }
    
  }
  