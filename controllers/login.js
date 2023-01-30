const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');
const connection = require('../dbConnection').promise();

exports.login =  async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        
        const [result] = await connection.execute(`SELECT * FROM users WHERE email = ?`, [req.body.email]);
        if (result.length === 0) {
            return res.status(422).json({
                message: 'Invalid email address'
            })
        }

        const passwordMatch = await bcrypt.compare(req.body.password, result[0].password);
        if (!passwordMatch) {
            return res.status(422).json({
                message: 'Incorrect password'
            });
        }

        const theToken = jwt.sign({id:result[0].id}, 'the-super-strong-secret', {expiresIn: '1h'});
        return res.json({
            token: theToken
        })
    } catch (error) {
        next(error)        
    }
}