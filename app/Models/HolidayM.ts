import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import  holidays from "App/Models/holidays";


export default class HolidayM extends BaseModel {
    public static table ="holidaymaster"
  
  // @column({isPrimary: true})
  // public Id: number

  @column()
  public Name: string

  @column()
  public Description: string

  @column({columnName:'OrganizationId'})
  public OrganizationId: number
  @column()
  public DateFrom: Date

  @column()
  public DateTo: Date
  
  @hasOne(()=>holidays)
  public Id:HasOne<typeof holidays>
}
