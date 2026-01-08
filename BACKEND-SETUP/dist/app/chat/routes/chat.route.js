import express from 'express';
import { CREATE_NEW_CHAT_CONTROLLER, EDIT_EXISTING_CHAT_CONTROLLER, GET_USER_CHAT_HISTORY_BY_ID_CONTROLLER, GET_USER_CHAT_HISTORY_CONTROLLER } from '../controllers/chat.controller.js';
import tryCatch from '../../../config/tryCatch.js';
import isAuth from '../../../config/isAuth.js';
const router = express.Router();
//creating chat
router.route('/').post(isAuth, tryCatch(CREATE_NEW_CHAT_CONTROLLER));
router.route('/user/history').get(isAuth, tryCatch(GET_USER_CHAT_HISTORY_CONTROLLER));
router.route('/:id').get(isAuth, tryCatch(GET_USER_CHAT_HISTORY_BY_ID_CONTROLLER));
router.route('/:id').put(isAuth, tryCatch(EDIT_EXISTING_CHAT_CONTROLLER));
export default router;
//# sourceMappingURL=chat.route.js.map