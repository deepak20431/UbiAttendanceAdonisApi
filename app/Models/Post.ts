import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Post extends BaseModel {
  public static table = 'EmployeeMaster'
  @column({ isPrimary: true })
  public Id: number


  
  
  @column()
  public EmployeeCode:string

  @column()
  public FirstName:string


  @column()
  public LastName :string

  @column()
  public DOB:Date
  
  
  @column()
  public Nationality:number


  
  @column()
  public MaritalStatus:number
  
  @column()
  public 	Religion:number
  
  @column()
  public BloodGroup:number
  
  @column()
  public KnownLanguage:string


  
  @column()
  public DeviceId:string

  
  @column()
  public OrganizationId:number

  

  
  


}
