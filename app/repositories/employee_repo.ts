// get all employees
import Employee from '#models/employee'
import { DateTime } from 'luxon'

export const getAll = async () => {
  const emps = await Employee.all()
  return emps
}

export const getEmpById = async (id: any) =>{
    const emp = await Employee.findOrFail(id)
    return emp
}

export const getEmpByQry = async (des: string, dob: Date) =>{
    const emp = await Employee.findByOrFail({ dob: dob, designation: des})
    return emp
}

export const postEmp = async (payload: {}) =>{
    const emp = await Employee.create(payload)    // try with save method too, chk whether the beforeSave hook works for create
    return emp
}

export const deleteEmp = async (id: number) => {
    const emp = await Employee.findOrFail(id)
    return await emp.delete()
}

export const updateEmp = async (id: number, payload: {}) => {
    const emp = await Employee.findOrFail(id)
    return await emp.merge(payload).save()
}

// export const patchEmp = async (id: number, payload: {}) =>{
//     const emp = await Employee.findOrFail(id)
//     return await emp.merge(payload).save()
// }