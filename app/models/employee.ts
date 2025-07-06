import { DateTime } from 'luxon'
import { BaseModel, beforeSave, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Manager from './manager.js'

export default class Employee extends BaseModel {
  @column({ isPrimary: true, columnName: 'empId' })
  declare empId: number

  @column({columnName: 'empName'})
  declare empName: string

  @column()
  declare dob: Date

  @column()
  declare salary: number

  @column({columnName: 'mgrId'})
  declare mgrId: number

  @column()
  declare designation: 'developer' | 'analyst' | 'architect'

  @belongsTo(() => Manager)
  declare mgr: BelongsTo<typeof Manager>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  static async checkMgrId(emp: Employee){
    const mgr = await Manager.find(emp.mgrId)
    if(!mgr){
      throw new Error('Manager does not exist.')
    }
  }
}