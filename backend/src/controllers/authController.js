import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { email, password, name, phone, profilePicUrl, company } = req.body

        const user = new User({
            email,
            passwordHash: password,
            profile: { name, phone, profilePicUrl, company }
        })

        await user.save()
        return res.status(201).json({ id: user._id })
    } catch (err) {
        return res.status(400).json({ error: err.message })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body

    try {
        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Compare password
        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' })
        }

        // Sign JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        )

        return res.json({ token })
    } catch (err) {
        return res.status(500).json({ error: 'Server error' })
    }
}
