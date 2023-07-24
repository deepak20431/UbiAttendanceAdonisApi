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

}
