const jwt = require('jsonwebtoken')

const authGurd = async (req, res, next) => {
    try {
        console.log(req.headers);

        const { authorization } = req.headers
        const token = authorization?.split(' ')[1]
        console.log('token in token', token);

        if (token) {
            const info = jwt.verify(token, process.env.JWT_SECRET)
            console.log('info', info);
            if (info) {
                const { name, username, phone, id } = info
                const user = { name, username, phone, id }
                req.user = user
                next()
            }
            else {
                res.status(401).json({ error: 'info nei request in token' })
            }

        }
        else {
            res.status(401).json({ error: 'unAuthenticated request in token' })
        }
    } catch (error) {
        console.log('error in verifyToken', error);

        res.status(401).json({ error: 'Authentication failure' })
    }

}

module.exports = authGurd