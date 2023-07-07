import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, column,  hasOne,  HasOne } from '@ioc:Adonis/Lucid/Orm'
import  holidays from "App/Models/holidays";

export default class HolidayM extends BaseModel {
  public static table ="holidaymaster"
  
  @column({isPrimary: true})
  public Id: number

  @column({columnName:'Name'})
  public Name: string

  @column({columnName:'Description'})
  public Description: string

  @column({columnName:'OrganizationId'})
  public OrganizationId: number
  
  @column({columnName:"DateFrom"})
  public DateFrom: Date

  @column({columnName:"DateTo"})
  public DateTo: Date
  
  @hasOne(()=>holidays)
  public homme:HasOne<typeof holidays>

  // HolidayM.$getrelation

}
