import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class getLastTimeOutModel extends BaseModel {
  @column()
  public EmployeeId: number

  @column()
  public OrganizationId: number

  @column()
  public AttendaceDate: Date

}
