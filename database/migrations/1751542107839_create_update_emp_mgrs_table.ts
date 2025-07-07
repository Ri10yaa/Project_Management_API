import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('employees', (table) => {
      table.integer('mgrId').references('mgrId').inTable('managers').onDelete('SET NULL')
    })

    this.schema.alterTable('managers', (table) => {
      table.decimal('salary')
    })
  }

  async down() {
    this.schema.dropTable('employees')
  }
}
