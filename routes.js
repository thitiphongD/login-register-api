const router = require('express').Router();
const {body} = require('express-validator');
const {register} = require('./controllers/register');
const {login} = require('./controllers/login');
const {getUser} = require('./controllers/getUser');

router.post('/register', [
    body('name', 'The name must be of minimum 4 characters length').notEmpty().escape().trim().isLength({min:4}),
    body('email', 'Invalid email address').notEmpty().escape().trim().isEmail(),
    body('password', 'The Password must be of minimum 4 characters length').notEmpty().trim().isLength({min:4}),
], register);

router.post('/login', [
    body('email', 'Invalid email address').notEmpty().escape().trim().isEmail(),
    body('password', 'The Password must be of minimum 4 characters length').notEmpty().trim().isLength({min:4}),
], login);

router.get('/getUser', getUser);

module.exports = router;