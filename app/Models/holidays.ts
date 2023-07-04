import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import  HolidayM from "App/Models/HolidayM";


export default class holidays extends BaseModel {

    public static table ="holidays"
  
  @column({isPrimary: true})
  public id: number

  @column()
  public holiday_Name: string

  @column()
  public status: number

  // @column()
  // public HM_Id: number

  @belongsTo(() => HolidayM, {
    foreignKey: 'HM_Id'
  })
  public HM_Id: BelongsTo<typeof HolidayM>

  // @belongsTo(()=>HolidayM)
  // public holidays:BelongsTo<typeof HolidayM>
}
