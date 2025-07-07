import type { HttpContext } from '@adonisjs/core/http'
import {
  getAll,
  postMgr,
  getMgrById,
  getMgrByQry,
  updateMgr,
  deleteMgr,
} from '../repositories/manager_repo.js'
import { mgrReq, patchMgrReq, validatePathParam, getReq } from '#validators/manager'
import Manager from '#models/manager'

export default class ManagersController {
 
  async index({ response }: HttpContext) {
    try {

      const res = await getAll()
      return response.status(200).send({ success: true, data: res })

    } catch (err) {
      return response.status(500).send({ success: false, data: err.message })
    }
  }


  async store({ request, response }: HttpContext) {
    try {

      const payload = await mgrReq.validate(request.body())
      const emp = await postMgr(payload as Manager)

      return response.status(200).send({ success: true, data: emp })

    } catch (err) {
      return response.status(500).send({ success: false, data: err.message })
    }
  }

  
  async show({ request, params, response }: HttpContext) {
    try {
      if (params.id != null && Object.keys(request.qs()).length == 0) {

        const pathparam = await validatePathParam.validate(params)
        const res = await getMgrById(pathparam.id)

        return response.status(200).send({ success: true, data: res })

      } else if (params.id == null && Object.keys(request.qs()).length > 0) {

        const payload = await getReq.validate(request.qs())

        const res = await getMgrByQry(payload.mgrName, payload.email)

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

  async update({ params, request, response }: HttpContext) {
    try {
      const req = request.only(['mgrName', 'dob', 'salary','email','phno'])

      const pathparam = await validatePathParam.validate(params)
      const payload = await mgrReq.validate(req)

      const mgr = await updateMgr(pathparam.id, payload as Manager)

      return response.status(200).send({ success: true, data: mgr })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  async handlePatch({ params, request, response }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)
      const payload = await patchMgrReq.validate(request.body())
      
      const emp = await updateMgr(pathparam.id, payload as Manager)

      return response.status(200).send({ success: true, data: emp })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.message })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)

      await deleteMgr(pathparam.id)
      
      return response.status(200).send({ success: true, data: 'Manager deleted.' })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }
}
