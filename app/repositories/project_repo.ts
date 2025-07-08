import Project from '#models/project'
import { projectType } from '#validators/project'

export const getAll = async () => {
  const pros = await Project.all()
  return pros
}

export const getProById = async (id: any) => {
  const pro = await Project.findOrFail(id)
  return pro
}

export const getProByQry = async (title: string, type: string) => {
  const pro = await Project.findByOrFail({ protitle: title, type: type })
  return pro
}

/* here I cannot directly get payload  with {} as type, it will be an empty object.
Either I should destructure it in the controller and send individual params or
send as instance of model
*/
export const postPro = async (payload: {proTitle: string, type: projectType, mgrId: number}) => {
  const exisPro = await Project.query()
    .where('proTitle', payload.proTitle)
    .andWhere('type', payload.type)
    .first()
  if (exisPro != null) {
    throw new Error('Project already exists.')
  } else {
    const pro = await Project.create(payload) // try with save method too, chk whether the beforeSave hook works for create
    return pro
  }
}

export const deletePro = async (id: number) => {
  const pro = await Project.findOrFail(id)
  await pro.delete()
}

export const updatePro = async (id: number, payload: Project) => {
  const pro = await Project.findOrFail(id)
  return await pro.merge(payload).save()
}
