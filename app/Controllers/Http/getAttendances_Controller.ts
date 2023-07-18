import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import AttendancesValidator from 'App/Validators/getAttendances_Validator'
import LogicsOnly from 'App/Services/getAttendances_service'

export default class User1sController {

    public async index({request,response}: HttpContextContract){ 

        //const result = await LogicsOnly.getAttendances__bothchange(request.all())
        const Value = await request.validate(AttendancesValidator.newPostSchema)
        const result = await LogicsOnly.getAttendances__bothchange(Value)
        return response.json(result)

    }

    public async edit({}:HttpContextContract){}
    
}