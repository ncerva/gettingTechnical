const router = require("express").Router();
const { Title,User,Comment } = require("../models");
// Import the custom middleware
const withAuth = require("../utils/auth");

// GET 
router.get("/", async (req, res) => {
  res.render('all');
});

  Post.findAll({
    // include the post ID, URL, title, and the timestamp from post creation
    attributes: [
        'id',
        'title',
        'post',
        'published',
      ],
      include: [
        {
            model: User,
            attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'title_id', 'post_text', 'user_id', 'published'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
    ]
})

.then(dbPostData => {
  const posts = dbPostData.map(post => post.get({ plain: true }));
  // pass the posts into the homepage template
  res.render('homepage', {
    posts,
    loggedIn: req.session.loggedIn
  });
})
.catch(err => {
  console.log(err);
  res.status(500).json(err);
});
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
          where: {
              id: req.params.id
          },
          attributes: [
              'id',
              'post',
              'title',
              'publshed'
          ],
          include: [{
                  model: Comment,
                  attributes: ['id', 'post_text', 'title_id', 'user_id', 'published'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              },
              {
                  model: User,
                  attributes: ['username']
              }
          ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          const post = dbPostData.get({ plain: true });
          console.log(post);
          res.render('single-post', { post, loggedIn: req.session.loggedIn });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// Render the login page.  If the user is logged in, redirect to the home page.
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// Render the sign up page.  If the user is logged in, redirect to the home page.
router.get('/signup', (req, res) => {
if (req.session.loggedIn) {
  res.redirect('/');
  return;
}

res.render('signup');
});

module.exports = router;
