import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class getAttendancebothValidator extends BaseValidator  {
    constructor(protected ctx: HttpContextContract) {
      super()
    }
  
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
      Dept_id:schema.number.optional() ,
      searchvalue:schema.string.optional()     
    }),message:BaseValidator.messages
    }
    
  }
  