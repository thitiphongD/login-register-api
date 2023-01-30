const {validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const connection = require('../dbConnection').promise();

exports.register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }

    try {
        
        const [checkEmail] = await connection.execute(`SELECT email FROM users WHERE email = ?`,
        [req.body.email]);
        if (checkEmail.length > 0) {
            return res.status(201).json({
                message: 'The E-mail already in use',
            });
        }

        const hashPassword = await bcrypt.hash(req.body.password, 12);

        const [registerResult] = await connection.execute(`INSERT INTO users (name, email, password)
        VALUES (?,?,?)`,[req.body.name, req.body.email, hashPassword]);
        if (registerResult.affectedRows === 1) {
            return res.status(201).json({
                message: 'The user has been successfully inserted.'
            })
        }

    } catch (error) {
        next(error)
    }
}