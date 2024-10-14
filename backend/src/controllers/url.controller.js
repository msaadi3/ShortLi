import { ApiError } from '../lib/ApiError.js';
import { ApiResponse } from '../lib/ApiResponse.js';
import { generateRandomId } from '../lib/generateRandomId.js';
import { Url } from '../models/url.model.js';
import { User } from '../models/user.model.js';
export const handleShortId = async (req, res, next) => {
  try {
    const url = req.body.url;

    if (!url) {
      throw new ApiError(400, 'url is required');
    }

    const shortId = generateRandomId(0, 9, 3);

    await Url.create({
      shortId: shortId,
      originalUrl: url,
      visitHistory: [],
      user: req.user._id,
      // user:req.email
    });

    return res
      .status(200)
      .json(
        new ApiResponse(200, 'URL shortened successfully', { shortId: shortId })
      );
  } catch (error) {
    next(error);
    // console.log('error while shortening url', error);
  }
};

export const handleRedirect = async (req, res, next) => {
  try {
    const shortId = req.params.shortId;

    const url = await Url.findOne({ shortId: shortId });

    if (!url) {
      throw new ApiError(404, 'URL not found');
    }

    const date = new Date();
    const dateString = date.toLocaleDateString();
    const timeString = date.toLocaleTimeString();
    const dateTimeString = `${dateString} & ${timeString}`;

    console.log(dateTimeString);

    url.visitHistory.push({ timeStamp: dateTimeString });

    await url.save();

    res.redirect(301, url.originalUrl);
  } catch (error) {
    next(error);
    // console.log('error while redirecting url', error);
  }
};

export const handleFetchAllUrlsOfUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      throw new ApiError(404, 'User not found');
    }

    const urls = await Url.find({ user: user });

    if (!urls) {
      throw new ApiError(404, 'urls not found or you have not created and url');
    }

    // console.log(urls);

    return res.status(200).json(new ApiResponse(200, 'URLS:', { urls }));
  } catch (error) {
    next(error);
  }
};
