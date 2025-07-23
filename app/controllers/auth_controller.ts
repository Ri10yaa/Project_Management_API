import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async register({ request }: HttpContext) {
    try {
      const payload = await registerValidator.validate(request.body())
      const user = await User.create(payload)
      const token = await User.accessTokens.create(user, ['*'], {
        expiresIn: '30 days',
      })
      return { 
        success: true, data: token
      }
    } catch (err) {
      throw err
    }
  }

  async login({ request }: HttpContext) {
    try {
      const payload = await loginValidator.validate(request.body())

      const user = await User.verifyCredentials(payload.username, payload.password)
      const token = await User.accessTokens.create(user)

      return {
        success: true,
        data: token
      }
    } catch (err) {
      throw err
    }
  }

  async logout({ auth }: HttpContext) {
    try {
      const user = await auth.user!

      await User.accessTokens.delete(user, user.currentAccessToken.identifier)

      return { success: true }
    } catch (err) {
      throw err
    }
  }

  async me({ auth }: HttpContext) {
    try {
      await auth.check()
      return {
        user: auth.user,
      }
    } catch (err) {
      throw err
    }
  }
}
