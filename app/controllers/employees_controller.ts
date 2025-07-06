import type { HttpContext } from '@adonisjs/core/http'
import {
  getAll,
  getEmpById,
  getEmpByQry,
  postEmp,
  deleteEmp,
  updateEmp,
} from '../repositories/employee_repo.js'
import { getReqQuery, postputReq, patchReq } from '#validators/employee'
import Employee from '#models/employee'

export default class EmployeesController {
  async index({ response }: HttpContext) {
    try {

      const res = await getAll()

      return response.status(200).send(res)

    } catch (err) {
      return response.status(500).send(err.messages)
    }
  }

  async store({ request, response }: HttpContext) {
    try {

      const payload = await postputReq.validate(request.body())
      const emp = await postEmp(payload as Employee)

      return response.status(200).send(emp)

    } catch (err) {
      return response.status(500).send(err.messages)
    }
  }

  async show({ request, params, response }: HttpContext) {
    try {
      if (params.id != null && request.qs() == null) {

        const res = getEmpById(params.id)
        return response.status(200).send(res)

      } else if (params.id == null && request.qs() != null) {

        const payload = await getReqQuery.validate(request.qs())
        const res = await getEmpByQry(payload.des, payload.dob)
        return response.status(200).send(res)

      } else {

        return response.status(404).send('Send either path param or query param.')

      }
    } catch (err) {

      return response.status(500).send(err.messages)
    }
  }
 
  async handlePatch({params, request, response} : HttpContext){
	  try{
      const payload = await patchReq.validate(request.body)
      const emp = await updateEmp(params.id, payload as Employee)

      return response.status(200).send(emp)

	  }catch(err){
		
      return response.status(500).send(err.messages)
	  }
  }

  async update({ params, request, response }: HttpContext) {
    try {
		const req = request.only(['name','dob','salary','mgrId'])
		const payload = await postputReq.validate(req)
		const emp = updateEmp(params.id, payload as Employee)
		return response.status(200).send(emp)
    } catch (err) {
      return response.status(500).send(err.messages)
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      await deleteEmp(params.id)
      return response.status(200).send('Employee deleted.')
    } catch (err) {
      return response.status(500).send(err.messages)
    }
  }
}
