// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;
    console.log('credential, password from post', credential, password);
    const user = await User.login(credential, password);
    if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
    }
    console.log(' user from login router  ', user);
    await setTokenCookie(res, user);

    return res.json({user});    
});

module.exports = router;