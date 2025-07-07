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
  
  async index({ response }: HttpContext) {
    try {
      const res = await getAll()
      return response.status(200).send({ success: true, data: res })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

 
  async store({ request, response }: HttpContext) {
    try {
      const payload = await postAndPutValidator.validate(request.body())
      const pro = await postPro(payload as Project)

      return response.status(200).send({ success: true, data: pro })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

 
  async show({ request, params, response }: HttpContext) {
    try {
      if (params.id != null && Object.keys(request.qs()).length == 0) {

        const pathparam = await validatePathParam.validate(params.id)
        const res = getProById(pathparam.id)

        return response.status(200).send({ success: true, data: res })

      } else if (params.id == null && Object.keys(request.qs()).length > 0) {

        const payload = await getValidator.validate(request.qs())

        const res = await getProByQry(payload.proTitle, payload.type)

        return response.status(200).send({ success: true, data: res })

      } else {
        return response
          .status(404)
          .send({ success: false, data: 'Send either path param or query param.' })
      }
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  async handlePatch({ params, request, response }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params.id)
      const payload = await patchValidator.validate(request.body())

      const pro = await updatePro(pathparam.id, payload as Project)

      return response.status(200).send({ success: true, data: pro })

    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }


  async update({ params, request, response }: HttpContext) {
    try {
      const req = request.only(['proTitle', 'type', 'mgrId'])
      const pathparam = await validatePathParam.validate(params.id)
      const payload = await postAndPutValidator.validate(req)

      const pro = await updatePro(pathparam.id, payload as Project)
      return response.status(200).send({ success: true, data: pro })

    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }


  async destroy({ params, response }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params.id)
      await deletePro(pathparam.id)
      
      return response.status(200).send({ success: true, data: 'Project deleted.' })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }
}
