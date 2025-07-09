import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Project extends BaseModel {
  @column({ isPrimary: true, columnName: 'proId' })
  declare proId: number

  @column({columnName: 'proTitle'})
  declare proTitle: string

  @column()
  declare type: 'iot' | 'web' | 'mobile' | 'ml'

  @column({columnName: 'mgrId'})
  declare mgrId: number

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare updatedAt: DateTime

}
