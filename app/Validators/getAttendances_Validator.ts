import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class AttendancesValidator extends BaseValidator{
 constructor(protected ctx: HttpContextContract) {
  super()
 }
   static newPostSchema = {schema:schema.create({
    empId:schema.number.optional(),
    orgId:schema.number(),
    shiftId:schema.number.optional(),
    deptId:schema.number.optional(),
    desigId:schema.number.optional(),
    FirstDate:schema.date.optional({format: 'yyyy-MM-dd'}),
    SecondDate:schema.date.optional({format:'yyyy-MM-dd'}),
    searchval:schema.string.optional()
    })
     ,message:BaseValidator.messages
   }
}