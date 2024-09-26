import { User } from '../models/user.model.js';
import { ApiError } from '../lib/ApiError.js';
import Jwt from 'jsonwebtoken';

export const verifyJwt = async (
  req,
  _ /**_ instead of res cuz res is of no use here thatswhy put _ here  */,
  // res,
  next
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
      // new ApiError(401, 'Unauthorized request');
      // return res.redirect('/auth');
    }

    const decodedToken = await Jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );

    if (!user) {
      throw new ApiError(401, 'Invalid access token');
      // new ApiError(401, 'Invalid access token');
      // res.redirect('/auth');
    }

    req.user = user;

    next();
  } catch (error) {
    throw new ApiError(
      401,
      `something went wrong in verifyJwt() function: ${error.message}`
    );
    // throw new ApiError(401, error?.message || 'something went wrong in verifyJwt() function')
  }
};
