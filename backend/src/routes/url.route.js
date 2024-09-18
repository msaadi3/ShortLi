import express from 'express';
import {
  handleRedirect,
  handleShortId,
} from '../controllers/url.controller.js';

const router = express.Router();

router.route('/url').post(handleShortId);

router.route('/:shortId').get(handleRedirect);

export default router;
