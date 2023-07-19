import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import EmployeesList from 'App/Service/getEmployeesListService'
import validateEmployeesList from 'App/Validators/getEmployeesList_validate'

export default class getEmployeesList{
public async getEmployeesList({ request, response }: HttpContextContract) {

  const validateData = await request.validate(validateEmployeesList.newPostSchema)
  const result:any = await EmployeesList.EmployeesList(validateData)
  return response.json(result)
}
}