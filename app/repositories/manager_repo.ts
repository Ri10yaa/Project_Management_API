/* eslint-disable prettier/prettier */
import Manager from '#models/manager'

export const getAll = async () => {
  const mgr = await Manager.all()
  console.log(mgr)
  return mgr
}

export const getMgrById = async (id: any) => {
  const mgr = await Manager.findOrFail(id)
  return mgr
}

export const getAllIds = async () =>{
  const ids = await Manager.query().select('mgrId').from('managers')
  return ids
}

// query by email or phno
export const getMgrByQry = async (name: string, email: string) => {
  const mgr = await Manager.query().where('mgrName',name).andWhere('email',email).first()
  return mgr
}

export const postMgr = async (payload: {mgrName: string, email: string, dob: Date, salary: number, phno: string}) => {
  const exisMgr = await Manager.query()
    .where('mgrName', payload.mgrName)
    .andWhere('email', payload.email)
    .first()
  if (exisMgr !== null) {
    throw new Error('Manager already exists.')
  } else {
    const mgr = await Manager.create(payload)
    return mgr
  }
}

export const deleteMgr = async (id: number) => {
  const mgr = await Manager.findOrFail(id)
  await mgr.delete()
}

export const updateMgr = async (id: number, payload: Manager) => {
  const mgr = await Manager.findOrFail(id)
  return await mgr.merge(payload).save()
}
