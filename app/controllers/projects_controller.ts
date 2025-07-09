import type { HttpContext } from '@adonisjs/core/http'
import {
  deletePro,
  getAll,
  getProById,
  getProByQry,
  postPro,
  updatePro,
} from '../repositories/project_repo.js'
import { getValidator, patchValidator, postAndPutValidator, validatePathParam } from '#validators/project'
import Project from '#models/project'

export default class ProjectsController {
  
  async index({}: HttpContext) {
    try {
      const res = await getAll()
      return { success: true, data: res }
    } catch (err) {
      throw err
    }
  }

 
  async store({ request }: HttpContext) {
    try {
      const payload = await postAndPutValidator.validate(request.body())
      const pro = await postPro(payload)

      return { success: true, data: pro }
    } catch (err) {
      throw err
    }
  }

 
  async show({ request, params }: HttpContext) {
    try {
      if (params.id !== undefined && Object.keys(request.qs()).length === 0) {

        const pathparam = await validatePathParam.validate(params)
        const res = await getProById(pathparam.id)

        return { success: true, data: res }

      } else if (params.id === undefined && Object.keys(request.qs()).length > 0) {

        const payload = await getValidator.validate(request.qs())

        const res = await getProByQry(payload.proTitle, payload.type)

        return { success: true, data: res }

      } else {
        return { success: false, data: 'Send either path param or query param.' }
      }
    } catch (err) {
      throw err
    }
  }

  async handlePatch({ params, request }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)
      const payload = await patchValidator.validate(request.body())

      const pro = await updatePro(pathparam.id, payload as Project)

      return { success: true, data: pro }

    } catch (err) {
      throw err
    }
  }


  async update({ params, request }: HttpContext) {
    try {
      const req = request.only(['proTitle', 'type', 'mgrId'])
      const pathparam = await validatePathParam.validate(params)
      const payload = await postAndPutValidator.validate(req)

      const pro = await updatePro(pathparam.id, payload as Project)
      return { success: true, data: pro }

    } catch (err) {
      throw err
    }
  }


  async destroy({ params }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)
      await deletePro(pathparam.id)
      
      return { success: true, data: 'Project deleted.' }
    } catch (err) {
      throw err
    }
  }
}
