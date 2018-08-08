const client = require('../db/client');
const PostService = require('./PostService');

module.exports = {
  async create(comment, post_id, user_id) {
    try {

      await client.then(conn => conn.query(`
            INSERT INTO comments (description, user_id, post_id, createdAt) 
            VALUES ('${comment}', '${user_id}', '${post_id}', now());
        `));
      const post = await PostService.getPostBuId(post_id);
      return post;

    } catch (err) {
      console.log(err);
    }
  },

}