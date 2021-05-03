const router = require('express').Router();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');
const titleRoutes = require('./titleRoutes');

router.use('/users', userRoutes);
router.use('/posts', postRoutes);
router.use('/title', titleRoutes);

module.exports = router;
