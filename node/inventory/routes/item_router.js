const {Router}=require('express');
const item_controller=require('../controllers/item_controller')

const item_router=Router();

item_router.get('/', item_controller.item_list);

item_router.get('/new', item_controller.item_create_get);
item_router.post('/new', item_controller.item_create_post);

item_router.get('/:id', item_controller.item_detail);

item_router.get('/:id/edit', item_controller.item_update_get);
item_router.post('/:id/edit', item_controller.item_update_post);

item_router.get('/:id/delete', item_controller.item_delete_get);
item_router.post('/:id/delete', item_controller.item_delete_post);

module.exports=item_router;