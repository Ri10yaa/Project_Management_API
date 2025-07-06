import vine from '@vinejs/vine'

export const mgrReq = vine.compile(
    vine.object({
        mgrName: vine.string().minLength(3).maxLength(30),
        dob: vine.date({formats: ['DD/MM/YYYY']}),
        salary: vine.number()
    })
)

export const patchMgrReq = vine.compile(
    vine.object({
        mgrName: vine.string().minLength(3).maxLength(30).optional(),
        dob: vine.date({formats: ['DD/MM/YYYY']}).optional(),
        salary: vine.number().optional()
    })
)