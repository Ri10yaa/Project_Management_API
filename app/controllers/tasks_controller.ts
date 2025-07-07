import type { HttpContext } from '@adonisjs/core/http'
import {
  getAll,
  postTask,
  getTaskById,
  getTaskByQry,
  updateTask,
  deleteTask,
} from '../repositories/task_repo.js'
import { postAndPutValidator, getValidator, patchValidator, validatePathParam } from '#validators/task'
import Task from '#models/task'

export default class TasksController {
  /**
   * Display a list of resource
   */
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
      const task = await postTask(payload as unknown as Task)
      return response.status(200).send({ success: true, data: task })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  /**
   * Show individual record
   */
  async show({ request, params, response }: HttpContext) {
    try {
      if (params.id != null && Object.keys(request.qs()).length == 0) {
        const pathparam = await validatePathParam.validate(params.id)
        const res = getTaskById(pathparam.id)

        return response.status(200).send(res)

      } else if (params.id == null && Object.keys(request.qs()).length > 0) {

        const payload = await getValidator.validate(request.qs())
        const res = await getTaskByQry(payload.taskTitle, payload.assignedTo)

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
      const pro = await updateTask(pathparam.id, payload as unknown as Task)

      return response.status(200).send({ success: true, data: pro })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    try {
      const req = request.only(['taskTitle', 'assignedTo', 'mgrId'])
      const pathparam = await validatePathParam.validate(params.id)
      const payload = await postAndPutValidator.validate(req)

      const pro = await updateTask(pathparam.id, payload as unknown as Task)
      return response.status(200).send({ success: true, data: pro })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params.id)
      await deleteTask(pathparam.id)
      return response.status(200).send({ success: true, data: 'Task deleted.' })
    } catch (err) {
      return response.status(500).send({ success: false, data: err.messages })
    }
  }
}
