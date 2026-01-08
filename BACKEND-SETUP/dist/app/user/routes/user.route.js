import express from 'express';
import { USER_LOGIN_DEMO, USER_LOGIN_FN } from '../controller/user.controller.js';
import tryCatch from '../../../config/tryCatch.js';
const router = express.Router();
router.route('/login').post(tryCatch(USER_LOGIN_FN));
router.route("/demo/login").post(tryCatch(USER_LOGIN_DEMO));
export default router;
//# sourceMappingURL=user.route.js.map