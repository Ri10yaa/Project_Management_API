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
      const task = await postTask(payload as unknown as Task)
      return { success: true, data: task }
    } catch (err) {
      throw err
    }
  }

  /**
   * Show individual record
   */
  async show({ request, params }: HttpContext) {
    try {
      if (params.id !== null && Object.keys(request.qs()).length === 0) {
        const pathparam = await validatePathParam.validate(params.id)
        const res = getTaskById(pathparam.id)

        return {success: true, data: res}

      } else if (params.id === null && Object.keys(request.qs()).length > 0) {

        const payload = await getValidator.validate(request.qs())
        const res = await getTaskByQry(payload.taskTitle, payload.assignedTo)

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
      const pathparam = await validatePathParam.validate(params.id)
      const payload = await patchValidator.validate(request.body())
      const pro = await updateTask(pathparam.id, payload as unknown as Task)

      return { success: true, data: pro }
    } catch (err) {
      throw err
    }
  }
  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    try {
      const req = request.only(['taskTitle', 'assignedTo', 'mgrId'])
      const pathparam = await validatePathParam.validate(params.id)
      const payload = await postAndPutValidator.validate(req)

      const pro = await updateTask(pathparam.id, payload as unknown as Task)

      return { success: true, data: pro }
    } catch (err) {
      throw err
    }
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    try {
      const pathparam = await validatePathParam.validate(params.id)
      await deleteTask(pathparam.id)
      return { success: true, data: 'Task deleted.' }
    } catch (err) {
      throw err
    }
  }
}
