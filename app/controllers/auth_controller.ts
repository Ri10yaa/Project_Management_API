import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  
  async register({ request }: HttpContext) {
    const payload = await registerValidator.validate(request.body())
    const user = await User.create(payload)

    return User.accessTokens.create(user,['*'],{
      expiresIn: '30 days'
    })
  }
  
  async login({ request }: HttpContext) {
    const payload = await loginValidator.validate(request.body())

    const user = await User.verifyCredentials(payload.username, payload.password)

    return User.accessTokens.create(user)
  }
  
  async logout({ auth }: HttpContext) {
    const user = await auth.user!

    await User.accessTokens.delete(user, user.currentAccessToken.identifier)

    return { success: true }
  }
  
  async me({ auth }: HttpContext) {
    await auth.check()
    return {
      user: auth.user
    }
  }
  
}