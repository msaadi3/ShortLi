import { ApiError } from '../lib/ApiError.js';
import { ApiResponse } from '../lib/ApiResponse.js';
import { generateRandomId } from '../lib/generateRandomId.js';
import { Url } from '../models/url.model.js';

export const handleShortId = async (req, res) => {
  const url = req.body.url;

  if (!url) {
    throw new ApiError(400, 'url is required');
  }

  const shortId = generateRandomId(0, 9, 7);

  await Url.create({
    shortId: shortId,
    originalUrl: url,
    visitHistory: [],
    // user:
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, 'URL shortened successfully', { shortId: shortId })
    );
};

export const handleRedirect = async (req, res) => {
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

  res.redirect(url.originalUrl);
};
