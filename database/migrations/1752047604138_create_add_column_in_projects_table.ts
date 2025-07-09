import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'projects'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
       table.enu('type', ['iot', 'web', 'mobile', 'ml'], {
        useNative: true,
        enumName: 'proType',
        existingType: false,
      })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}