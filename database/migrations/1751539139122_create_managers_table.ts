import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'managers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('mgrId')
      table.string('mgrName')
      table.date('dob')
      // need to add projectId column as foreign key
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
