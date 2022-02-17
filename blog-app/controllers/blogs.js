const router = require('express').Router();
const { tokenExtractor } = require('../util/middleware');

const { Blog, User } = require('../models');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  if (req.blog) {
    next();
  } else {
    const e = new Error('Blog not found');
    e.name = 'NotFound';
    throw e;
  }
};

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name'],
    },
  });
  console.log(JSON.stringify(blogs));
  res.json(blogs);
});

router.get('/:id', blogFinder, async (req, res) => {
  console.log(req.blog.toJSON());
  res.json(req.blog);
});

router.post('/', tokenExtractor, async (req, res) => {
  const blog = await Blog.create({ ...req.body, userId: req.user.id }); // = build(re.body) then save()
  return res.json(blog);
});

router.put('/:id', blogFinder, async (req, res) => {
  req.blog.likes = req.body.likes;
  await req.blog.save();
  res.json(req.blog);
});

router.delete('/:id', blogFinder, tokenExtractor, async (req, res) => {
  if (req.blog.userId === req.user.id) {
    await req.blog.destroy();
    res.status(204).end();
  } else {
    res
      .status(401)
      .json({ error: "You don't have permission to delete this blog." })
      .end();
  }
});

module.exports = router;
