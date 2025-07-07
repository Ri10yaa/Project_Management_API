import Employee from '#models/employee'

export const getAll = async () => {
  const emps = await Employee.all()
  return emps
}

export const getEmpById = async (id: any) => {
  const emp = await Employee.findOrFail(id)
  return emp
}

// query by email or phno
export const getEmpByQry = async (name: string, email: string) => {
  const emp = await Employee.query().where('empName',name).andWhere('email',email).first()
  return emp
}

/* here I cannot directly get payload it will be an empty object.
Either I should destructe it the controller and send individual params or
send as instance of model
*/
export const postEmp = async (payload: Employee) => {
  const exisEmp = await Employee.query()
    .where('empName', payload.empName)
    .andWhere('email', payload.email)
    .first()
  if (exisEmp !== null) {
    throw new Error('Employee already exists.')
  } else {
    const emp = await Employee.create(payload) // try with save method too, chk whether the beforeSave hook works for create
    return emp
  }
}

export const deleteEmp = async (id: number) => {
  const emp = await Employee.findOrFail(id)
  await emp.delete()
}

export const updateEmp = async (id: number, payload: Employee) => {
  const emp = await Employee.findOrFail(id)
  return await emp.merge(payload).save()
}
