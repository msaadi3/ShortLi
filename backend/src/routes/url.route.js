import express from 'express';
import {
  handleFetchAllUrlsOfUser,
  handleRedirect,
  handleShortId,
} from '../controllers/url.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

// router.route('/url', verifyJwt).post(handleShortId);  // middleware didn't run through this method of writing but below two methods are working perfectly
// router.route('/url').post(verifyJwt, handleShortId);
router.post('/url', verifyJwt, handleShortId);

router.get('/analytics', verifyJwt, handleFetchAllUrlsOfUser);

router.get('/:shortId', handleRedirect);

export default router;
