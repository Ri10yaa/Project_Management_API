/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

/* ------employee-------- */
router.group(()=>{
  router.get('/all',"#controllers/employees_controller.index");

  router.get('/:id','#controllers/employees_controller.show').where('id',{
    match: /^[0-9]$/
  })
  router.get('/','#controllers/employees_controller.show')     // query parameter send dob and designation

  router.post('/','#controllers/employees_controller.store')

  router.put('/:id','#controllers/employees_controller.update').where('id',{
    match: /^[0-9]$/
  })

  router.patch('/:id','#controllers/employees_controller.handlePatch').where('id',{
    match: /^[0-9]$/
  })


  router.delete('/:id','#controllers/employees_controller.destroy').where('id',{
    match: /^[0-9]$/
  })

  
}).prefix('emp')


/* ------Manager------- */

router.group(()=>{
  router.get('/all',"#controllers/,managers_controller.index");

  router.get('/:id','#controllers/managers_controller.show').where('id',{
    match: /^[0-9]$/
  })
  router.get('/','#controllers/managers_controller.show')     // query parameter: send name and salary

  router.post('/','#controllers/managers_controller.store')

  router.put('/:id','#controllers/managers_controller.update').where('id',{
    match: /^[0-9]$/
  })

  router.patch('/:id','#controllers/managers_controller.handlePatch').where('id',{
    match: /^[0-9]$/
  })


  router.delete('/:id','#controllers/managers_controller.destroy').where('id',{
    match: /^[0-9]$/
  })

  
}).prefix('mgr')


/* --------Projects---------- */

router.group(()=>{
  router.get('/all',"#controllers/,projects_controller.index");

  router.get('/:id','#controllers/projects_controller.show').where('id',{
    match: /^[0-9]$/
  })
  router.get('/','#controllers/projects_controller.show')     // query parameter: send name and salary

  router.post('/','#controllers/projects_controller.store')

  router.put('/:id','#controllers/projects_controller.update').where('id',{
    match: /^[0-9]$/
  })

  router.patch('/:id','#controllers/projects_controller.handlePatch').where('id',{
    match: /^[0-9]$/
  })


  router.delete('/:id','#controllers/projects_controller.destroy').where('id',{
    match: /^[0-9]$/
  })

  
}).prefix('pro')
