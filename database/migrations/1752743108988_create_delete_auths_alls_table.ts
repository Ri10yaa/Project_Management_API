import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'auths'

  async up() {
    this.schema.dropTable('auth_access_tokens')
    this.schema.dropTable('users')
    this.schema.dropTable('auths')
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
