/* eslint-disable prettier/prettier */
import vine from '@vinejs/vine'
import { checkID } from '#start/rules/validationForIDs'
import { unique } from '#start/rules/uniqueEmail'
import { uniquePn } from '#start/rules/uniquePhoneNo'

export const validatePathParam = vine.compile(
  vine.object({
    id: vine.number().use(checkID({ table: 'managers', column: 'mgrId' })),
  })
)

export const getReq = vine.compile(
  vine.object({
    mgrName: vine.string(),
    email: vine.string().email(),
  })
)

export const mgrReq = vine.compile(
  vine.object({
    mgrName: vine.string().minLength(3).maxLength(30),
    dob: vine.date({ formats: ['DD/MM/YYYY'] }),
    salary: vine.number(),
    email: vine.string().email().use(unique({ table: 'managers'})),
    phno: vine.string().fixedLength(10).use(uniquePn({table: 'managers'})),
  })
)

export const mgrPutReq = vine.compile(
  vine.object({
    mgrName: vine.string().minLength(3).maxLength(30),
    dob: vine.date({ formats: ['DD/MM/YYYY'] }),
    salary: vine.number(),
    email: vine.string().email(),
    phno: vine.string().fixedLength(10),
  })
)

export const patchMgrReq = vine.compile(
  vine.object({
    mgrName: vine.string().minLength(3).maxLength(30).optional(),
    dob: vine.date({ formats: ['DD/MM/YYYY'] }).optional(),
    salary: vine.number().optional(),
    email: vine.string().email().use(unique({ table: 'managers'})).optional(),
    phno: vine.string().fixedLength(10).optional().use(uniquePn({table: 'managers'}))
  })
)
