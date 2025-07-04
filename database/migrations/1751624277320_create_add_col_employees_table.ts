import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'employees'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.enu('designation',['developer','architect','analyst'],{
        useNative: true,
        enumName: 'empType',
        existingType: false
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}