const jwt = require('jsonwebtoken');

const { SECRET } = require('../util/config');
const { User, Session } = require('../models');

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  if (error.name === 'NotFound') {
    return res.sendStatus(404);
  } else if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: error.message });
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired',
    });
  } else if (error) {
    return res.status(400).json({ error });
  }
  next(error);
};

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization');
  req.token = null;

  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7);
    const session = await Session.findOne({
      where: { token },
    });

    if (session) {
      req.token = token;
      req.decodedToken = jwt.verify(req.token, SECRET);
    } else return res.status(401).json({ error: 'token expired' });
  }

  if (!authorization || !req.decodedToken.id) {
    return res.status(401).json({ error: 'missing token' });
  }

  req.user = await User.findByPk(req.decodedToken.id);

  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
};
