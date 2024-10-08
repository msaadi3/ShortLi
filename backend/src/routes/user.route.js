import { Router } from 'express';
import {
  changeCurrentPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  deleteAccount,
} from '../controllers/user.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/register', registerUser);

router.post('/login', loginUser);

// secured routes
router.post('/logout', verifyJwt, logoutUser);

router.post('/refresh-accessToken', refreshAccessToken);

router.post('/update-password', verifyJwt, changeCurrentPassword);

router.patch('/update-account-info', verifyJwt, updateAccountDetails);

router.delete('/delete-account', verifyJwt, deleteAccount);

export default router;
