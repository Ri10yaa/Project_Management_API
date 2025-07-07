import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { format } from 'date-fns'

export default class Manager extends BaseModel {
  @column({ isPrimary: true, columnName: 'mgrId' })
  declare mgrId: number

  @column({ columnName: 'mgrName' })
  declare mgrName: string

  @column({serialize: (value: Date) => format(value, 'dd/MM/yyyy')})
  declare dob: Date

  @column()
  declare salary: number

  @column()
  declare email: string

  @column()
  declare phno: string

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare updatedAt: DateTime
}
