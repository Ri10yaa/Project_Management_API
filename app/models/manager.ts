import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Manager extends BaseModel {
  @column({ isPrimary: true })
  declare mgrId: number

  @column()
  declare mgrName: string

  @column.date()
  declare dob: DateTime

  @column()
  declare salary: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}