import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Task extends BaseModel {
  @column({ isPrimary: true, columnName:'taskId' })
  declare taskId: number

  @column({columnName: 'taskTitle'})
  declare taskTitle: string

  @column({columnName: 'assignedTo'})
  declare assignedTo: number

  @column({serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm')})
  declare completedAt: DateTime

  @column({columnName: 'proId'})
  declare proId: number

  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare updatedAt: DateTime
}
