const router = require('express').Router();
const PostService = require('../services/PostService');
const CommentService = require('../services/CommentService');
const checkAuth = require('../middleware/auth');


router.post('', checkAuth, async (req, res, next) => {
  try {
    const { comment, post_id } = req.body;
    const user_id = req.userDate.id;
    const post = await CommentService.create(comment, post_id, user_id);
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
});

module.exports = router;