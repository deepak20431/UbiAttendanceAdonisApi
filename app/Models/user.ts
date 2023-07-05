import Profile from 'App/Models/profile'

import {
  column,
  BaseModel,
  BelongsTo,
  belongsTo
} from '@ioc:Adonis/Lucid/Orm'

export default class User extends BaseModel {
    
    @belongsTo(() => Profile)
    public user: BelongsTo<typeof Profile>
}