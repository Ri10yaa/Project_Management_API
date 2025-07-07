import vine from '@vinejs/vine'
import { checkID } from '#start/rules/validationForIDs'
import { unique } from '#start/rules/uniqueEmail'
import { uniquePn } from '#start/rules/uniquePhoneNo'

export const validatePathParam = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'employees', column: 'empId' })),
  })
)

export const getReqQuery = vine.compile(
  vine.object({
    empName: vine.string(),
    email: vine.string().email().use(unique({ table: 'employees'}))
  })
)

export const postputReq = vine.compile(
  vine.object({
    empName: vine.string().minLength(3).maxLength(30),
    dob: vine.date({ formats: ['DD/MM/YYYY'] }),
    salary: vine.number(),
    mgrId: vine.number().use(checkID({ table: 'managers', column: 'mgrId' })),
    designation: vine.enum(['developer', 'architect', 'analyst']),
    email: vine.string().email().use(unique({ table: 'employees'})),
    phno: vine.string().fixedLength(10).use(uniquePn({table: 'employees'}))
  })
)

export const patchReq = vine.compile(
  vine.object({
    name: vine.string().minLength(3).maxLength(30).optional(),
    dob: vine.date({ formats: ['DD/MM/YYYY'] }).optional(),
    salary: vine.number().optional(),
    mgrId: vine
      .number()
      .optional()
      .use(checkID({ table: 'managers', column: 'mgrId' })),
    phno: vine.string().fixedLength(10).optional().use(uniquePn({table: 'employees'})),
    email: vine.string().email().use(unique({ table: 'employees'})).optional()
  })
)
