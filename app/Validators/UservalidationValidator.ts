import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UservalidationValidator {
  constructor(protected ctx: HttpContextContract) {}

  
   
  
  static  postSchema = {schema:schema.create({
    Id:schema.number.optional(),
    AttendanceDate:schema.date.optional({format: 'yyyy-MM-dd'}),

    OrganizationId:schema.number.optional()

   


  
  })
}
}
