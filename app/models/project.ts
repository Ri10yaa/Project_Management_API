import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Manager from './manager.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare proId: number

  @column()
  declare proTitle: string

  @column()
  declare type: 'IoT' | 'Web' | 'Mobile' | 'ML'

  @hasOne(() => Manager)
  declare mgr: HasOne<typeof Manager>
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}