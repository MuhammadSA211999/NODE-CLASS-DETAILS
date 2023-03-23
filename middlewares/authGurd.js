const jwt = require('jsonwebtoken')

const authGurd = async (req, res, next) => {
    try {

        const { authorization } = req.headers
        const token = authorization?.split(' ')[1]

        if (token) {
            const info = jwt.verify(token, process.env.JWT_SECRET)

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

        res.status(401).json({ error: 'Authentication failure' })
    }

}

module.exports = authGurd