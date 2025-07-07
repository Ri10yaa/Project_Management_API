import type { HttpContext } from '@adonisjs/core/http'
import {
  getAll,
  getEmpById,
  getEmpByQry,
  postEmp,
  deleteEmp,
  updateEmp,
} from '../repositories/employee_repo.js'
import { getReqQuery, postputReq, patchReq, validatePathParam } from '#validators/employee'
import Employee from '#models/employee'

export default class EmployeesController {
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
      const payload = await postputReq.validate(request.body())
      const emp = await postEmp(payload as Employee)

      return response.status(200).send({ success: true, data: emp })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  async show({ request, params, response }: HttpContext) {
    try {
      if (params.id != null && Object.keys(request.qs()).length == 0) {
        const pathparam = await validatePathParam.validate(params)

        const res = getEmpById(pathparam.id)
        return response.status(200).send({ success: true, data: res })
      } else if (params.id == null && Object.keys(request.qs()).length > 0) {

        const payload = await getReqQuery.validate(request.qs())
        const res = await getEmpByQry(payload.empName, payload.email)

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
      const pathparam = await validatePathParam.validate(params)

      const payload = await patchReq.validate(request.body())

      const emp = await updateEmp(pathparam.id, payload as Employee)

      return response.status(200).send({ success: true, data: emp })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  async update({ params, request, response }: HttpContext) {
    try {
      const req = request.only(['empName', 'dob', 'salary', 'mgrId','phno', 'email','designation'])

      const pathparam = await validatePathParam.validate(params)

      const payload = await postputReq.validate(req)

      const emp = await updateEmp(pathparam.id, payload as Employee)

      return response.status(200).send({ success: true, data: emp })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  async destroy({ params, response }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)

      await deleteEmp(pathparam.id)

      return response.status(200).send({ success: true, data: 'Employee deleted.' })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }
}
