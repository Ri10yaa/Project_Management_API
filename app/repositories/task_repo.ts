import Task from '#models/task'

export const getAll = async () => {
  const tasks = await Task.all()
  return tasks
}

export const getTaskById = async (id: any) => {
  const task = await Task.findOrFail(id)
  return task
}

export const getTaskByQry = async (title: string, empId: number) => {
  const task = await Task.findByOrFail({ taskTitle: title, assignedTo: empId })
  return task
}

/* here I cannot directly get payload  with {} as type, it will be an empty object.
Either I should destructure it in the controller and send individual params or
send as instance of model
*/
export const postTask = async (payload: Task) => {
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
