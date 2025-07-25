import { Router } from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import {
    getProfile,
    addFriend,
    listFriends
} from '../controllers/userController.js'

const router = Router()

// Protected routes
router.get('/:id', authMiddleware, getProfile)
router.post('/:id/friends', authMiddleware, addFriend)
router.get('/:id/friends', authMiddleware, listFriends)

export default router
