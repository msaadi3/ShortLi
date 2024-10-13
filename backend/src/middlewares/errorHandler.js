export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // Default to 500 if no status code is provided
  const message = err.message || 'Internal Server Error';

  console.error('Error: ', err); // Log the error (this can be enhanced with logging libraries like Winston)

  // Send error details to the frontend
  res.status(statusCode).json({
    success: false,
    message,
  });
};
