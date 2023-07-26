import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import BaseValidator from './BaseValidator'


export default class AttendanceValidator extends BaseValidator {
  constructor(protected ctx: HttpContextContract) {
    super()
  }

  static Attendance = {
    schema: schema.create({
      OrganizationId: schema.number(),
      startdate: schema.date.optional({
        format: 'yyyy-MM-dd',
      }),
      enddate: schema.date.optional({
        format: 'yyyy-MM-dd',
      }),
      ShiftId: schema.number.optional(),
      Desg_id: schema.number.optional(),
      Dept_id: schema.number.optional(),
      searchvalue: schema.string.optional()
    }), message: BaseValidator.messages
  }

  static AdminQrKiosk = {
    schema: schema.create({
      OrganizationId: schema.number(),
      EmployeeId: schema.number(),
      Kioskpin: schema.number()
    }), message: BaseValidator.messages
  }

  static QrKiosk = {
    schema: schema.create({
      OrganizationId: schema.number(),
      EmployeeId: schema.number(),
    }), message: BaseValidator.messages
  }

  static getLasttimeOut = {
    schema: schema.create({
      OrganizationId: schema.number(),
      EmployeeId: schema.number(),
    }), message: BaseValidator.messages
  }

  static getmultishiftlist = {
    schema: schema.create({
      EmployeeId: schema.number(),
      OrganizationId: schema.number(),
    }), message: BaseValidator.messages
  }


  static AddDesignationschema ={

 schema:schema.create({
    uid: schema.number(),
    orgid: schema.number(),
    name: schema.string(),
    sts: schema.number(),
    desc: schema.string(),
  })
}
   static Designationschema ={
    schema:schema.create({
      orgid:schema.number.optional(),
      status:schema.number.optional(),
      pagename:schema.number.optional(),
      currentpage:schema.number.optional(),
      perpage:schema.number.optional()

    })
   }


   static updateDesignationschema={
    schema:schema.create({
      uid:schema.number(),
      design:schema.string(),
      sts:schema.number(),
      did:schema.number(),
      orgid:schema.number()
      
    })
   }




}
