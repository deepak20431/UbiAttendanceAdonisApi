import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class GetQrKioskStatusModel extends BaseModel {
  @column()
  public EmployeeId: number

  @column()
  public OrganizationId: number

  @column()
  public QrKioskPageReopen: string

  @column()
  public kioskPin: string

}
