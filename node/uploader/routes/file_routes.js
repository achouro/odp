const express= require('express');
const file_controller=require('../controllers/file_controller')
const { ensure_authentication }= require('../middleware/authentication')
const {upload}=require('../middleware/upload')

const router=express.Router();

router.use(ensure_authentication);
router.post('/upload', upload.single('file'), file_controller.upload_file);

router.post('/',  file_controller.upload_file);
router.get('/:id',  file_controller.get_file_details);
router.get('/:id/download', file_controller.download_file);
router.delete('/:id',  file_controller.delete_file);

module.exports=router;