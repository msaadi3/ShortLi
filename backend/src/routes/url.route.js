import express from 'express';
import {
  handleRedirect,
  handleShortId,
} from '../controllers/url.controller.js';
import { verifyJwt } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.route('/url', verifyJwt).post(handleShortId);

router.route('/:shortId').get(handleRedirect);

export default router;
