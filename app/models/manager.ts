import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Manager extends BaseModel {
  @column({ isPrimary: true, columnName: "mgrId" })
  declare mgrId: number

  @column({columnName: "mgrName"})
  declare mgrName: string

  @column()
  declare dob: Date

  @column()
  declare salary: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}