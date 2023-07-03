import Hash from '@ioc:Adonis/Core/Hash'
// import { column, beforeSave, BaseModel } from '@ioc:Adonis/Lucid/Orm'
import { BaseModel, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'

export default class Showtable extends BaseModel {
    public static table ="practice"
  
  @column({isPrimary: true})
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public phone: number

  @column()
  public password: string

  @beforeSave()
  public static async hashPassword (user:Showtable) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
