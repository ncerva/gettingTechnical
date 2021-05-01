const Title = require('./Title');
const User = require('./User');
const Post = require('./Post');

Title.belongsTo(User, {
foreignKey: 'user_id',
});

User.hasMany(Title, {
foreignKey: 'user_id',
});

Post.belongsTo(User, {
foreignKey: 'user_id',
});

Post.belongsTo(Title, {
foreignKey: 'user_id',
});

User.hasMany(Post, {
foreignKey: 'user_id',
});

Title.hasMany(Post, {
foreignKey: 'post_id',
onDelete: "cascade"
});

module.exports = { Title, User, Post };
