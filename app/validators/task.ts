import vine from '@vinejs/vine'
import { checkID } from '#start/rules/validationForIDs'

function includeUnderscore (value: unknown){
  if(typeof value === 'string'){
    return value.replace(" ","_")
  }
  
}

export const validatePathParam = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'tasks', column: 'taskId' })),
  })
)

export const postAndPutValidator = vine.compile(
  vine.object({
    taskTitle: vine.string().minLength(3).maxLength(30).parse(includeUnderscore),
    assignedTo: vine.number(),
    proId: vine.number().use(checkID({ table: 'projects', column: 'proId' }))
  })
)

export const getValidator = vine.compile(
  vine.object({
    taskId: vine.number().use(checkID({ table: 'tasks', column: 'taskId'})),
    assignedTo: vine.number(),
  })
)

export const patchValidator = vine.compile(
  vine.object({
    taskTitle: vine.string().minLength(3).maxLength(30).parse(includeUnderscore).optional(),
    assignedTo: vine.number().optional(),
    assignedAt: vine.date({ formats: ['DD/MM/YYYY HH:mm'] }).optional(),
    completedAt: vine.date({ formats: ['DD/MM/YYYY HH:mm'] }).optional(),
    proId: vine.number().use(checkID({ table: 'projects', column: 'proId' })),
  })
)
