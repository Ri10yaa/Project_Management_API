import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Employee from './employee.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Task extends BaseModel {
  @column({ isPrimary: true })
  declare taskId: number

  @column()
  declare taskTitle: string

  @column.dateTime({autoCreate: true})
  declare assignedAt: DateTime

  @belongsTo(()=> Employee)
  declare emp: BelongsTo<typeof Employee>

  @column.dateTime()
  declare completedAt: DateTime
  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}