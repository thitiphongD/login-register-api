const jwt = require('jsonwebtoken');
const connection = require('../dbConnection').promise();

exports.getUser = async (req, res, next) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.startsWith('Bearer') ||
            !req.headers.authorization.split(' ')[1]
        ) {
            return res.status(422).json({
                message: 'Please provide the token'
            });
        }

        const theToken = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(theToken, 'the-super-strong-secret');

        const [result] = await connection.execute(`SELECT id, name, email FROM users WHERE id = ?`, [decoded.id]);
        if (result.length > 0) {
            return res.status(200).json({
                user: result[0]
            })
        } else {
            return res.status(404).json({
                message: 'No user found'
            })
        }

    } catch (error) {
        next(error)
    }
}