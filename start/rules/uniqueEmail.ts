import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type options = {
  table: string
}

async function uniqueEmail(value: unknown, options: options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }
  const row = await db
    .query()
    .select('email')
    .from(options.table)
    .where('email', value)
    .first()
  if (row) {
    field.report(`Email from ${options.table} alreay exists.`, 'uniqueEmail', field)
  }
}

export const unique = vine.createRule(uniqueEmail)
