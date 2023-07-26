import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AttendanceService from 'App/Services/AttendanceService';
import AttendanceValidator from 'App/Validators/AttendanceValidator';

export default class Attendances {

    public async getAttendance({ request, response }: HttpContextContract) {

        const a = await request.validate(AttendanceValidator.Attendance);

        const b = await AttendanceService.getAttendance(a);

        return response.json(b);

    }

    public async getAdminQrKioskPin({ request, response }: HttpContextContract) {

        const c: any = await request.validate(AttendanceValidator.AdminQrKiosk);

        const d = await AttendanceService.GetAdminQrKioskPin(c);

        return response.json(d);

    }

    public async GetQrKiosk({ request, response }: HttpContextContract) {

        const a: any = await request.validate(AttendanceValidator.QrKiosk);

        const b = await AttendanceService.GetQrKiosk(a);

        return response.json(b);
    }



    public async getLastTimeOut({ request, response }: HttpContextContract) {

        const a = await request.validate(AttendanceValidator.getLasttimeOut)

        const b = await AttendanceService.getLastTimeOut(a);

        return response.json(b);

    }

    public async getmultishift({ request, response }: HttpContextContract) {

        const a = await request.validate(AttendanceValidator.getmultishiftlist);

        const b = await AttendanceService.getmultishift(a);

        return response.json(b);

    }

    public async getEmployeesList({ request, response }: HttpContextContract) {

        const validateData = await request.validate(AttendanceValidator.EmployeesList)
        const result:any = await AttendanceService.EmployeesList(validateData)
        return response.json(result)
    }

    public async setQrKioskPin({request,response}: HttpContextContract){

        const data:any = await request.validate(AttendanceValidator.QrKioskPin)
        const result = await AttendanceService.Service_setQrKioskPin(data)
        return response.json(result)
        
    }

    public async getSetKioskPin({ request, response }: HttpContextContract) {

        const data:any = await request.validate(AttendanceValidator.getSetKioskPinV)
        const result = await AttendanceService.getSetKioskPinService(data)
        return response.json(result)
    
    }
}

