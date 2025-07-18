import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
    vine.object({
        username: vine.string().minLength(3).maxLength(50).unique( async (db, value)=>{
            const match = await db.query().from('users').select('id').where('username',value).first()
            return !match
        }),
        password: vine.string().minLength(8)
    })
)

export const loginValidator = vine.compile(
    vine.object({
        username: vine.string().minLength(3),
        password: vine.string().minLength(8)
    })
)