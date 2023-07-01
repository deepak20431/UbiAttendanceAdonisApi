import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  public static table = 'designationmaster'

  @column({ isPrimary: true })
  public Id: number

  @column()
  public Name:string

  @column()
  public archive:string

  @column()
  public OrganizationId:number

}
