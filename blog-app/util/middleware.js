const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'NotFound') {
    return res.sendStatus(404);
  } else if (error) {
    return res.status(400).json({ error });
  }
  next(error);
};

module.exports = {
  errorHandler,
};
