import vine from '@vinejs/vine'
import { checkID } from '#start/rules/validationForIDs'

export const validatePathParam = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'projects', column: 'proId' })),
  })
)

export const postAndPutValidator = vine.compile(
  vine.object({
    proTitle: vine.string().minLength(3).maxLength(30),
    type: vine.enum(['Web', 'Mobile', 'ML', 'IoT']),
    mgrId: vine.number().use(checkID({ table: 'managers', column: 'mgrId' })),
  })
)

export const patchValidator = vine.compile(
  vine.object({
    proTitle: vine.string().minLength(3).maxLength(30).optional(),
    type: vine.enum(['Web', 'Mobile', 'ML', 'IoT']).optional(),
    mgrId: vine
      .number()
      .optional()
      .use(checkID({ table: 'managers', column: 'mgrId' })),
  })
)

export const getValidator = vine.compile(
  vine.object({
    proTitle: vine.string().minLength(3).maxLength(30),
    type: vine.enum(['Web', 'Mobile', 'ML', 'IoT']),
  })
)
