import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { format } from 'date-fns'


export default class Employee extends BaseModel {
  @column({ isPrimary: true, columnName: 'empId' })
  declare empId: number

  @column({ columnName: 'empName' })
  declare empName: string

  @column({serialize: (value: Date) => format(value, 'dd/MM/yyyy')})
  declare dob: Date

  @column()
  declare salary: number

  @column({ columnName: 'mgrId' })
  declare mgrId: number

  @column()
  declare designation: 'developer' | 'analyst' | 'architect'

  @column()
  declare email: string

  @column()
  declare phno: string


  @column.dateTime({ autoCreate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true, serialize: (value: DateTime) => value.toFormat('dd/MM/yyyy HH:mm') })
  declare updatedAt: DateTime

  // @beforeSave()
  // static async checkMgrId(emp: Employee) {
  //   const mgr = await Manager.find(emp.mgrId)
  //   if (!mgr) {
  //     throw new Error('Manager does not exist.')
  //   }
  // }
}
