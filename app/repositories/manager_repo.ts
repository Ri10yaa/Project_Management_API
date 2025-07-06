import Manager from "#models/manager"

export const getAll = async () => {
  const mgr = await Manager.all()
  return mgr
}

export const getMgrById = async (id: any) =>{
    const mgr = await Manager.findOrFail(id)
    return mgr
}

export const getMgrByQry = async (name: string, salary: number) =>{
    const mgr = await Manager.findByOrFail({ mgrName: name, salary: salary})
    return mgr
}

export const postMgr = async (payload: Manager) =>{
    const exisMgr = await Manager.query().where('mgrName', payload.mgrName).first()
    if(exisMgr!=null){
        throw new Error("Manager already exists.")
    }
    else{
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

