// backend/routes/api/index.js
const router = require('express').Router();


// backend/routes/api/index.js
// ...

router.post('/test', function(req, res) {
    res.json({ requestBody: req.body });
  });
  
  // ...

// fetch('/api/test', {
// method: "POST",
// headers: {
//     "Content-Type": "application/json",
//     "XSRF-TOKEN": `RPKsbqjg-rgfdLS7Vh-qrscyyQpyKZyEkSno`
// },
// body: JSON.stringify({ hello: 'world' })
// }).then(res => res.json()).then(data => console.log(data));
  
//! GET /api/set-token-cookie
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
router.get('/set-token-cookie', async (_req, res) => {
  const user = await User.findOne({
    where: {
      username: 'Demo-lition'
    }
  });
  setTokenCookie(res, user);
  return res.json({ user: user });
});

//! GET /api/restore-user
const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

const { requireAuth } = require('../../utils/auth.js');
router.get(
  '/require-auth',
  requireAuth,
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;