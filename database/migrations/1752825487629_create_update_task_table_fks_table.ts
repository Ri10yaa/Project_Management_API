import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
     table.dropForeign(['empId'])

      // Alter column to be nullable and re-add FK with ON DELETE SET NULL
      table.integer('empId').unsigned().nullable().alter()
      table
        .foreign('empId')
        .references('empId')
        .inTable('employees')
        .onDelete('SET NULL')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}