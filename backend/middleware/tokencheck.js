import jwt from 'jsonwebtoken'
import User from '../models/User.js'

function tokenCheck(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        return res.sendStatus(401)
    }

    jwt.verify(token, process.env.SECRET, async (err, payload) => {
        if (err) {
            return res.sendStatus(403)
        }
        const user = await User.findOne({ username: payload.username })
        if (!user) {
            return res.status(400).json({ error: 'Invalid token' })
        }
        req.user = user 
        next()
    })
}

export default tokenCheck