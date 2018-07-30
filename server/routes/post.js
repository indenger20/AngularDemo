const router = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const PostService = require('../services/PostService');
const checkAuth = require('../middleware/auth');


router.post('', checkAuth, async (req, res, next) => {
    try {
        const postData = req.body;
        const user_id = req.userDate.id;
        const posts = await PostService.create(postData, user_id);
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
});

router.put('', checkAuth, async (req, res, next) => {
    try {
        const postData = req.body;
        const user_id = req.userDate.id;
        const posts = await PostService.update(postData, user_id);
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
});

router.get('', checkAuth, async (req, res, next) => {
    try {
        const user_id = req.userDate.id;
        const posts = await PostService.getAllPosts(user_id);
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
});

router.get('/:id', checkAuth, async (req, res, next) => {
    try {
        const post_id = req.params.id;
        const user_id = req.userDate.id;
        const post = await PostService.getPostBuId(post_id, user_id);
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).json({
            error
        })
    }
});

module.exports = router;