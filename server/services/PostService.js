const client = require('../db/client');

module.exports = {
    async getAllPosts() {
        try {
            const posts = await client.then(conn => conn.query('SELECT title, imagePath, description, id FROM posts'));
            return posts;
        } catch (err) {
            console.log(err);
        }
    },
    async create(postData, user_id) {
        try {
            const { title, imagePath, imageName, description } = postData;
            await client.then(conn => conn.query(`
                INSERT INTO posts (title, imageName, imagePath, description, user_id) 
                VALUES ('${title}', '${imageName}', '${imagePath}', '${description}', '${user_id}')
            `));
            const posts = await this.getAllPosts();
            return posts;

        } catch (err) {
            console.log(err);
        }
    },

    async getPostBuId(post_id) {
        try {
            const post = await client.then(conn => conn.query(`SELECT * from posts WHERE id = ${post_id}`));
            return post.length ? post[0] : null;
        } catch (err) {
            console.log(err);
        }
    }
}