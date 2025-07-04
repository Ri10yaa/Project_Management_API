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
  router.get('/','#controllers/employees_controller.show')     // query parameter

  router.post('/','#controllers/employees_controller.store')

  router.put('/:id','#controllers/employees_controller.update').where('id',{
    match: /^[0-9]$/
  })

  router.patch('/:id','#controllers/employees_controller.update').where('id',{
    match: /^[0-9]$/
  })


  router.delete('/:id','#controllers/employees_controller.destroy').where('id',{
    match: /^[0-9]$/
  })

  
}).prefix('emp')
