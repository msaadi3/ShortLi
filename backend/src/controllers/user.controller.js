import { ApiError } from '../lib/ApiError.js';
import { ApiResponse } from '../lib/ApiResponse.js';
import { User } from '../models/user.model.js';
import Jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if ([userName, email, password].some((field) => field?.trim() === '')) {
    throw new ApiError(400, 'Please fill all fields');
  }

  // console.log(req.body);

  // if (userName || email || password === '') {
  //     throw new ApiError(400, 'Please fill all fields')
  // }

  const userExists = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (userExists) {
    throw new ApiError(409, 'User already exists');
  }

  const user = await User.create({
    email,
    password,
    userName,
    // userName: userName.toLowerCase,
  });

  const createdUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  if (!createdUser) {
    throw new ApiError(500, 'Error while creating user');
  }

  return res
    .status(201)
    .json(new ApiResponse(200, 'User created successfully', createdUser));
};

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      'something went wrong while generating access and refresh token'
    );
  }
};

const loginUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!(userName || email)) {
    throw new ApiError(401, 'userName or email is required');
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (!user) {
    throw new ApiError(404, 'user does not exist');
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, 'password is not valid');
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    '-password -refreshToken'
  );

  const cookiesOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
    path: '/', // Ensure the cookie is valid across the entire site
  };

  return res
    .status(200)
    .cookie('accessToken', accessToken, cookiesOptions)
    .cookie('refreshToken', refreshToken, cookiesOptions)
    .json(
      new ApiResponse(200, 'user logged in successfully', {
        user: loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      })
    );
};

const logoutUser = async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const cookiesOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
    path: '/', // Ensure the cookie is valid across the entire site
  };

  return res
    .status(200)
    .clearCookie('accessToken', cookiesOptions)
    .clearCookie('refreshToken', cookiesOptions)
    .json(new ApiResponse(200, 'user logged out', {}));
};

const refreshAccessToken = async (req, res) => {
  const userRefreshToken = req.cookies.refreshToken || req.body.refreshToken;

  if (!userRefreshToken) {
    throw new ApiError(401, 'Unauthorized request');
  }

  try {
    const decodedToken = Jwt.verify(
      userRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, 'Invalid refresh token');
    }

    if (userRefreshToken !== user.refreshToken) {
      throw new ApiError(401, 'Unauthorized request');
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const cookiesOptions = {
      httpOnly: true,
      // secure: true,
      sameSite: 'lax',
      path: '/', // Ensure the cookie is valid across the entire site
    };

    return res
      .status(200)
      .cookie('accessToken', accessToken, cookiesOptions)
      .cookie('refreshToken', refreshToken, cookiesOptions)
      .json(
        new ApiResponse(200, 'access code refreshed successfully', {
          accessToken,
          refreshToken,
        })
      );
  } catch (error) {
    throw new ApiError(
      401,
      error?.message || 'something went wrong while refreshing access token'
    );
  }
};

const changeCurrentPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);

  const isPasswordValid = user.isPasswordCorrect(oldPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid old password');
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, 'password changed successfully'));
};

const updateAccountDetails = async (req, res) => {
  const { userName, email } = req.body;
  const user = await User.findById(req.user?._id);

  if (!(userName || email)) {
    throw new ApiError(401, 'Please fill in the fiels you want to update');
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        userName: userName || user.userName,
        email: email || user.email,
      },
    },
    {
      new: true, // updated response in return
    }
  ).select('-password');

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'account details updated successfully', updatedUser)
    );
};

const deleteAccount = async (req, res) => {
  const userId = req.user?._id;

  const findUserAndDelete = await User.findByIdAndDelete(userId);

  if (!findUserAndDelete) {
    throw new ApiError(
      401,
      'User not found or something went wrong while deleting user'
    );
  }

  const cookiesOptions = {
    httpOnly: true,
    // secure: true,
    sameSite: 'lax',
    path: '/', // Ensure the cookie is valid across the entire site
  };

  return res
    .status(200)
    .clearCookie('accessToken', cookiesOptions)
    .clearCookie('refreshToken', cookiesOptions)
    .json(new ApiResponse(200, 'account deleted successfully', {}));
};

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  updateAccountDetails,
  deleteAccount,
};
