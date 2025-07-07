import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  declare proId: number

  @column()
  declare proTitle: string

  @column()
  declare type: 'IoT' | 'Web' | 'Mobile' | 'ML'

  @column()
  declare mgrId: number

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare updatedAt: DateTime

  //add before save here
}
