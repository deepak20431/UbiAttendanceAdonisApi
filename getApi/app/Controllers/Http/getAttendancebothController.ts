import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import getAttendancebothValidator from 'App/Validators/getAttendancebothValidator'
import getAttendancebothService from 'App/Services/getAttendancebothService';

export default class getAttendanceboth{

    public async getAttendance({ request,response }: HttpContextContract){
        
        const a = await request.validate(getAttendancebothValidator.getAttendancebothschema);

        const b = await getAttendancebothService.getAttendance(a);

        return response.json(b); 
        
    }
}