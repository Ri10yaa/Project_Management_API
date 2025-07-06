import type { HttpContext } from '@adonisjs/core/http'
import { getAll, postMgr, getMgrById, getMgrByQry, updateMgr, deleteMgr } from '../repositories/manager_repo.js'
import { mgrReq, patchMgrReq } from '#validators/manager'
import Manager from '#models/manager'

export default class ManagersController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {
    try {

      const res = await getAll()

      return response.status(200).send(res)

    } catch (err) {
      return response.status(500).send(err.messages)
    }
  }

 
  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
     try {
    
          const payload = await mgrReq.validate(request.body())
          const emp = await postMgr(payload as Manager)
    
          return response.status(200).send(emp)
    
        } catch (err) {
          return response.status(500).send(err.messages)
        }
  }

  /**
   * Show individual record
   */
  async show({ request, params, response }: HttpContext) {
    try {
          if (params.id != null && request.qs() == null) {
    
            const res = getMgrById(params.id)
            return response.status(200).send(res)
    
          } else if (params.id == null && request.qs() != null) {
    
            const payload = await mgrReq.validate(request.qs())
            const res = await getMgrByQry(payload.mgrName, payload.salary)
            return response.status(200).send(res)
    
          } else {
    
            return response.status(404).send('Send either path param or query param.')
    
          }
        } catch (err) {
    
          return response.status(500).send(err.messages)
        }
  }

 
  async update({ params, request, response }: HttpContext) {
     try {
        const req = request.only(['name','dob','salary'])
        const payload = await mgrReq.validate(req)

        const mgr = updateMgr(params.id, payload as Manager)

        return response.status(200).send(mgr)

        } catch (err) {

          return response.status(500).send(err.messages)
        }
  }

  async handlePatch({ params, request, response }: HttpContext) {
      try {
        console.log("ent")
        const payload = await patchMgrReq.validate(request.body())
        console.log("ent")
        const emp = await updateMgr(params.id, payload as Manager)

        return response.status(200).send(emp)

      } catch (err) {

        return response.status(500).send(err.messages)
      }
    }

  async destroy({ params, response }: HttpContext) {
    try {
          await deleteMgr(params.id)
          return response.status(200).send('Manager deleted.')

        } catch (err) {

          return response.status(500).send(err.messages)
        }
  }
}