import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UservalidationValidator {
  constructor(protected ctx: HttpContextContract) {}

  
   
  
  static  postSchema = {schema:schema.create({
    // Id:schema.number.optional(),
    AttendanceDate:schema.date({format: 'yyyy-MM-dd'}),
    startDate:schema.date({format: 'yyyy-MM-dd'}),
    endDate:schema.date({format: 'yyyy-MM-dd'}),




    // ShiftId:schema.number(),
    // DesignId:schema.number(),
    // DeptId:schema.number(),
    // ZoneId:schema.number(),
    // attendanceid:schema.number(),

    // searchValue:schema.string(),
    OrganizationId:schema.number.optional(),
    // EmployeeId:schema.number()


   


  
  })
}
}
