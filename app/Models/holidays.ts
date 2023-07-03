import Hash from '@ioc:Adonis/Core/Hash'
// import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class Showtable extends BaseModel {
    public static table ="holidaymaster"
  
  @column({isPrimary: true})
  public Id: number

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
}

