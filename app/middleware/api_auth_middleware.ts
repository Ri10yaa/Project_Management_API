import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import env from '#start/env'

export default class ApiAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
   const clientAPIkey = ctx.request.header('x-api-key')

    const apiKey = env.get('APP_KEY')

    if(!clientAPIkey || clientAPIkey !== apiKey){
      return ctx.response.status(401).json({ message : 'Invalid or missing API key'})
    }
    
    await next()
  }
}