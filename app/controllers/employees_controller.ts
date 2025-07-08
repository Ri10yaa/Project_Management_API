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
      const payload = await postputReq.validate(request.body())
      const emp = await postEmp(payload)
      
      return { success: true, data: emp }
    } catch (err) {
      throw err
    }
  }

  async show({ request, params }: HttpContext) {
    try {
      if (params.id !== null && Object.keys(request.qs()).length === 0) {
        const pathparam = await validatePathParam.validate(params)

        const res = getEmpById(pathparam.id)

        return { success: true, data: res }
      } else if (params.id === null && Object.keys(request.qs()).length > 0) {
        const payload = await getReqQuery.validate(request.qs())
        const res = await getEmpByQry(payload.empName, payload.email)

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

      const payload = await patchReq.validate(request.body())

      const emp = await updateEmp(pathparam.id, payload as Employee)

      return { success: true, data: emp }
    } catch (err) {
      throw err
    }
  }

  async update({ params, request }: HttpContext) {
    try {
      const req = request.only([
        'empName',
        'dob',
        'salary',
        'mgrId',
        'phno',
        'email',
        'designation',
      ])

      const pathparam = await validatePathParam.validate(params)

      const payload = await postputReq.validate(req)

      const emp = await updateEmp(pathparam.id, payload as Employee)

      return { success: true, data: emp }
    } catch (err) {
      throw err
    }
  }

  async destroy({ params }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params)

      await deleteEmp(pathparam.id)

      return { success: true, data: 'Employee deleted.' }
    } catch (err) {
      throw err
    }
  }
}
