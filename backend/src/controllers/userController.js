import User from '../models/userModel.js'

/**
 * GET /users/:id
 * Fetch a user’s profile by ID (excluding passwordHash).
 */
export const getProfile = async (req, res) => {
    try {
        const user = await User
            .findById(req.params.id)
            .select('-passwordHash')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.json(user)
    } catch (err) {
        return res.status(500).json({ error: 'Server error' })
    }
}

/**
 * POST /users/:id/friends
 * Add the authenticated user (req.userId) as a friend of target user.
 */
export const addFriend = async (req, res) => {
    const myId = req.userId
    const targetId = req.params.id

    try {
        if (myId === targetId) {
            return res.status(400).json({ message: 'Cannot add yourself' })
        }

        const me = await User.findById(myId)
        if (!me) {
            return res.status(404).json({ message: 'Current user not found' })
        }

        if (me.friends.includes(targetId)) {
            return res.status(400).json({ message: 'Already friends' })
        }

        // Traget friend list also needs to be updated
        const targetUser = await User.findById(targetId)
        if (!targetUser) {
            return res.status(404).json({ message: 'Target user not found' })
        }

        me.friends.push(targetId)
        await me.save()

        targetUser.friends.push(myId)
        await targetUser.save()

        return res.json({ message: 'Friend added' })
    } catch (err) {
        return res.status(500).json({ error: 'Server error' })
    }
}

/**
 * GET /users/:id/friends
 * Return a list of friends for the given user ID.
 */
export const listFriends = async (req, res) => {
    try {
        const user = await User
            .findById(req.params.id)
            .populate('friends', 'profile.name profilePicUrl email')
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.json(user.friends)
    } catch (err) {
        return res.status(500).json({ error: 'Server error' })
    }
}