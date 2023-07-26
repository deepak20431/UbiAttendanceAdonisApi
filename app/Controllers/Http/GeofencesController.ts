import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import GeofencesService from 'App/Services/GeofenceService'
import GeofenceValidator from 'App/Validators/GeofenceValidator'

export default class GeofencesController {
  public async index({request,response}: HttpContextContract) {
   
    await request.validate(GeofenceValidator.GeofenceSchema)
    const responsedata = await GeofencesService.GetGeofenceallData(request.all())
    response.json(responsedata)
    

   
    
    




}

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
