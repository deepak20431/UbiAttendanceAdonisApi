// import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class EmpMasterModel extends BaseModel {
  public static table="employeemaster"

  @column({ columnName:'OrganizationId' })
  public OrganizationId: number

  @column()
  public empid:number

  @column()
  public Id:number

  @column()
  public pageName:string

  @column()
  public currentPage:string

  @column()
  public perPage:string

  @column()
  public FirstName:string

  @column()
  public LastName:string
   
}
