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

    public async getdepartment({ request, response }: HttpContextContract) {

        const a = await request.validate(AttendanceValidator.getdepartment);

        const b = await AttendanceService.getdepartment(a);

        return response.json(b);
    }

    public async addDept({ request, response }: HttpContextContract) {

        const a = await request.validate(AttendanceValidator.addepartment);

        const b = await AttendanceService.addDept(a);

        return response.json(b);
    }

    public async updatedept({ request, response }: HttpContextContract) {

        const a = await request.validate(AttendanceValidator.updatedept);

        const b = await AttendanceService.updatedept(a);

       return response.json(b);
    }
}

