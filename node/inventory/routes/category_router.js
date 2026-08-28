const { Router } = require('express');
const category_controller = require('../controllers/category_controller');

const category_router = Router();

category_router.get('/', category_controller.category_list);
category_router.get('/new', category_controller.category_create_get);
category_router.post('/new', category_controller.category_create_post);
category_router.get('/:id', category_controller.category_detail);
category_router.get('/:id/edit', category_controller.category_update_get);
category_router.post('/:id/edit', category_controller.category_update_post);
category_router.get('/:id/delete', category_controller.category_delete_get);
category_router.post('/:id/delete', category_controller.category_delete_post);

module.exports = category_router;