import Task from '#models/task'
import { DateTime } from 'luxon'

export const getAll = async () => {
  const tasks = await Task.all()
  return tasks
}

export const getTaskById = async (id: any) => {
  const task = await Task.findOrFail(id)
  return task
}

export const getTaskByQry = async (id: number, empId: number) => {
  const task = await Task.findByOrFail({ taskId: id, assignedTo: empId })
  return task
}

/* here I cannot directly get payload  with {} as type, it will be an empty object.
Either I should destructure it in the controller and send individual params or
send as instance of model
*/
export const postTask = async (payload: {taskTitle: string, assignedTo: number, proId: number}) => {
  const exisTask = await Task.query()
    .where('taskTitle', payload.taskTitle)
    .andWhere('assignedTo', payload.assignedTo)
    .first()
  if (exisTask != null) {
    throw new Error('Task already exists.')
  } else {
    const task = await Task.create(payload)
    return task
  }
}

export const deleteTask = async (id: number) => {
  const task = await Task.findOrFail(id)
  await task.delete()
}

export const updateTask = async (id: number, payload: Task) => {
  const task = await Task.findOrFail(id)
  return await task.merge(payload).save()
}
