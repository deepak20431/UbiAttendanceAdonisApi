import Post from 'App/Models/user'

import {
  column,
  BaseModel,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'

export default class Profile extends BaseModel {
    @hasOne(() => Profile, {
        foreignKey: 'profileUserId', // defaults to userId
      })
      public profile: HasOne<typeof Profile>
}


