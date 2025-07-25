import jwt from 'jsonwebtoken'

export default function authMiddleware(req, res, next) {
    const header = req.headers.authorization

    // Check for Bearer token
    if (!header || !header.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    const token = header.split(' ')[1]

    try {
        // Verify and extract payload
        const { userId } = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = userId
        next()
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}
