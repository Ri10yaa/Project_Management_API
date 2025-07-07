import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('email'),
      table.string('phno',10)
    })

    this.schema.alterTable('managers',(table) =>{
      table.string('email'),
      table.string('phno',10)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}