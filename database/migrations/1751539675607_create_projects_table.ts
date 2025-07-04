import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('proId')
      table.string('proTitle')
      table.enu('type',['IoT','Web','Mobile','ML'],{
        useNative : true,
        enumName : "Domains",
        existingType : false
      })
      table.integer('mgrId').references('mgrId').inTable('managers').onDelete('SET NULL')
      
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}