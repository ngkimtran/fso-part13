const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');
const { ReadingList } = require('../models');

router.post('/', async (req, res) => {
  const readinglist = await ReadingList.create(req.body);
  return res.json(readinglist);
});

router.put('/:id', tokenExtractor, async (req, res) => {
  const read = await ReadingList.findByPk(req.params.id);

  if (read.userId === req.user.id) {
    read.read = req.body.read;
    await read.save();
    res.json(read);
  } else {
    res.status(404).end();
  }
});

module.exports = router;
