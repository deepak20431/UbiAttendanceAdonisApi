import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class getAttendancebothValidator  {
    constructor(protected ctx: HttpContextContract) {}
  
    static getAttendancebothschema = {schema:schema.create({
      OrganizationId:schema.number(),
      EmployeeId:schema.number.optional(),
      startdate: schema.date.optional({
        format: 'yyyy-MM-dd',
      }),
      enddate: schema.date.optional({
        format: 'yyyy-MM-dd',
      }),
      ShiftId:schema.number.optional(),
      Desg_id:schema.number.optional(),
      Dept_id:schema.number.optional()      
    }),message:BaseValidator.messages
    }
    
  }
  