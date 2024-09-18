import { Router } from 'express';
import {
  changeCurrentPassword,
  changeEmail,
  changeFullName,
  changeUserName,
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.route('/register').post(registerUser);

router.route('/login').post(loginUser);

// secured routes
router.route('/logout').post(verifyJwt, logoutUser);

router.route('/refresh-accessToken').post(refreshAccessToken);

router.route('/update-password').post(verifyJwt, changeCurrentPassword);

router.route('/get-user').get(verifyJwt, getCurrentUser);

router.route('/update-account-info').patch(verifyJwt, updateAccountDetails);

router.route('/update-name').patch(verifyJwt, changeFullName);

router.route('/update-username').patch(verifyJwt, changeUserName);

router.route('/update-email').patch(verifyJwt, changeEmail);

export default router;
