import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('taskId')
      table.string('taskTitle')
      table.dateTime('assignedAt').defaultTo(this.now())
      table.integer('assignedTo').references('empId').inTable('employees')
      table.dateTime('completedAt')
      table.integer('proId').references('proId').inTable('projects')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}