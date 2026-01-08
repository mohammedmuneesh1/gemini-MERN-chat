import type { Request, Response } from "express";
import type { AuthenticatedRequest } from "../../../config/isAuth.js";
export declare function USER_LOGIN_DEMO(req: Request, rs: Response): Promise<Response<any, Record<string, any>>>;
export declare const USER_LOGIN_FN: (req: Request, rs: Response) => Promise<Response<any, Record<string, any>>>;
/**
 * @desc    Get MY PROFILE BY ID
 * @route   GET /api/users/profile/:id
 * @access  Private
 * @returns  MY profile object
 */
export declare function MY_PROFILE(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @desc    Get USER PROFILE BY ID params
 * @route   GET /api/u-profile/:id
 * @access  Private
 * @returns  user profile object
 */
export declare function GET_USER_PROFILE_BY_ID(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
/**
 * @desc    put USER PROFILE BY ID params
 * @route   PUT /api/profile/:id
 * @access  Private
 * @returns  user profile object
 */
export declare function UPDATE_USER_PROFILE_BY_ID(req: AuthenticatedRequest, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=user.controller.d.ts.map