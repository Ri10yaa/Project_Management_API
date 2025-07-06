import vine from '@vinejs/vine'


export const getReqQuery = vine.compile(
    vine.object({
        dob: vine.date(),
        des: vine.enum(['developer','architect','analyst'])
    })
)

export const postputReq = vine.compile(
    vine.object({
        empName: vine.string().minLength(3).maxLength(30),
        dob: vine.date({formats: ['DD/MM/YYYY']}),
        salary: vine.number(),
        mgrId: vine.number(),
        designation : vine.enum(['developer','architect','analyst'])
    })
)

export const patchReq = vine.compile(
    vine.object({
        name: vine.string().minLength(3).maxLength(30).optional(),
        dob: vine.date({formats: ['DD/MM/YYYY']}).optional(),
        salary: vine.number().optional(),
        mgrId: vine.number().optional()
    })
)

