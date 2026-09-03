const express = require('express');
const folder_controller = require('../controllers/folder_controller');
const { ensure_authentication } = require('../middleware/authentication');

const router = express.Router();

router.use(ensure_authentication);

router.get('/dashboard', folder_controller.get_dashboard);
router.get('/folders', folder_controller.get_folders);

router.post('/folders', folder_controller.create_folder);
router.get('/folders/:id', folder_controller.get_folder);
router.put('/folders/:id', folder_controller.update_folder);
router.delete('/folders/:id', folder_controller.delete_folder);

module.exports = router;