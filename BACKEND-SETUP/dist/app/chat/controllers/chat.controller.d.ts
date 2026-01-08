import type { Response } from "express";
import type { AuthenticatedRequest } from "../../../config/isAuth.js";
export declare function CREATE_NEW_CHAT_CONTROLLER(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function GET_USER_CHAT_HISTORY_CONTROLLER(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function GET_USER_CHAT_HISTORY_BY_ID_CONTROLLER(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function EDIT_EXISTING_CHAT_CONTROLLER(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=chat.controller.d.ts.map