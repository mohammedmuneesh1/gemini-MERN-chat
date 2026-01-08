import express from 'express';
import { MEDIA_IMAGEKIT_DELETE_BY_FILE_ID_CONTROLLER, MEDIA_IMAGEKIT_UPLOAD_CONTROLLER } from '../controllers/media.controller.js';
import tryCatch from '../../../config/tryCatch.js';

const router = express.Router();

router.route("/upload").get(tryCatch(MEDIA_IMAGEKIT_UPLOAD_CONTROLLER));
router.route('/imagekit/delete/:fileId').delete(tryCatch(MEDIA_IMAGEKIT_DELETE_BY_FILE_ID_CONTROLLER));








export default router;