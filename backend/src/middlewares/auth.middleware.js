import { User } from '../models/user.model.js';
import { ApiError } from '../lib/ApiError.js';
import Jwt from 'jsonwebtoken';

export const verifyJwt = async (
  req,
  // res,
  _ /**_ instead of res cuz res is of no use here thatswhy put _ here  */,
  next
) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const decodedToken = await Jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      '-password -refreshToken'
    );

    if (!user) {
      throw new ApiError(401, 'Invalid access token');
    }

    req.user = user;

    next();
  } catch (error) {
    next(
      new ApiError(401, `Something went wrong in verifyJwt: ${error.message}`)
    );
  }
};
