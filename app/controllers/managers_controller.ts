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

      const payload = await mgrReq.validate(request.body())
      const emp = await postMgr(payload)

      return { success: true, data: emp }

    } catch (err) {
      throw err
    }
  }

  
  async show({ request, params }: HttpContext) {
    try {
      if (params.id !== undefined && Object.keys(request.qs()).length === 0) {

        const pathparam = await validatePathParam.validate(params)
        const res = await getMgrById(pathparam.id)

        return { success: true, data: res }

      } else if (params.id === undefined && Object.keys(request.qs()).length > 0) {

        const payload = await getReq.validate(request.qs())

        const res = await getMgrByQry(payload.mgrName, payload.email)

        return { success: true, data: res }

      } else {
        return { success: false, data: 'Send either path param or query param.' }
      }
    } catch (err) {
      throw err
    }
  }

  async update({ params, request }: HttpContext) {
    try {
      const req = request.only(['mgrName', 'dob', 'salary','email','phno'])

      const pathparam = await validatePathParam.validate(params)
      const payload = await mgrReq.validate(req)

      const mgr = await updateMgr(pathparam.id, payload as Manager)

      return { success: true, data: mgr }
    } catch (err) {
      throw err
    }
  }

  async handlePatch({ params, request }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)
      const payload = await patchMgrReq.validate(request.body())
      
      const emp = await updateMgr(pathparam.id, payload as Manager)

      return { success: true, data: emp }
    } catch (err) {
      throw err
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)

      await deleteMgr(pathparam.id)
      
      return { success: true, data: 'Manager deleted.' }
    } catch (err) {
      throw err
    }
  }
}
