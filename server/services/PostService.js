const client = require('../db/client');


module.exports = {

    async updatePopularity(type, user_id, post_id) {
        await client.then(conn => conn.query(`
            INSERT INTO popularity (type, user_id, post_id)
            VALUES ('${type}', '${user_id}', '${post_id}')
        `));
        const posts = await this.getAllPosts();
        return posts;
    },

    async getAllPosts(user_id) {
        try {
            const posts = await client.then(conn => conn.query('SELECT posts.*, popularity.type as popularity_type FROM posts LEFT JOIN popularity ON posts.id = popularity.post_id'));
            if (user_id) {
                posts.forEach(p => {
                    p.editable = p.user_id === user_id;
                });
            }
            return posts;
        } catch (err) {
            console.log(err);
        }
    },
    async create(postData, user_id) {
        try {
            const { title, imagePath, imageName, description, descriptionFull } = postData;
            await client.then(conn => conn.query(`
                INSERT INTO posts (title, imageName, imagePath, description, user_id, descriptionFull) 
                VALUES ('${title}', '${imageName}', '${imagePath}', '${description}', '${user_id}', '${descriptionFull}');
            `));
            const posts = await this.getAllPosts();
            return posts;

        } catch (err) {
            console.log(err);
        }
    },

    async update(postData, user_id) {
        try {
            const { title, imagePath, imageName, description, descriptionFull } = postData;
            await client.then(conn => conn.query(`
                UPDATE posts
                SET title='${title}', imagePath='${imagePath}', imageName='${imageName}', description='${description}', descriptionFull='${descriptionFull}'
                WHERE id = ${user_id}
            `));
            const posts = await this.getAllPosts();
            return posts;

        } catch (err) {
            console.log(err);
        }
    },

    async getPostBuId(post_id, user_id) {
        try {
            const post = await client.then(conn => conn.query(`SELECT * FROM posts WHERE id = ${post_id}`));
            if (user_id) {
                post.forEach(p => {
                    p.editable = p.user_id === user_id;
                });
            }
            return post.length ? post[0] : null;
        } catch (err) {
            console.log(err);
        }
    }
}