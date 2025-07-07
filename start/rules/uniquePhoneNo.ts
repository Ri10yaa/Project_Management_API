import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import { FieldContext } from '@vinejs/vine/types'

type options = {
  table: string
}

async function uniquePhoneNo(value: unknown, options: options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }
  const row = await db
    .query()
    .select('phno')
    .from(options.table)
    .where('phno', value)
    .first()
  if (row) {
    field.report(`Phone number from ${options.table} alreay exists.`, 'uniquePhoneNo', field)
  }
}

export const uniquePn = vine.createRule(uniquePhoneNo)
