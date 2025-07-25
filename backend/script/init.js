import mongoose from 'mongoose'
import User from '../src/models/userModel.js'
import 'dotenv/config';

async function main() {
    try {
        // Connect DB
        await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/react_express_auth")
        console.log('✅ MongoDB connected')

        // Clear existing users
        await User.deleteMany({})
        console.log('🗑️  Cleared users collection')

        // Create sample users
        const sample = [
            {
                email: '123@123',
                passwordHash: '123',
                profile: {
                    name: 'Kan',
                    phone: '000-0000',
                    profilePicUrl: '',
                    company: 'AKSd Inc.'
                }
            },
            {
                email: 'alice@example.com',
                passwordHash: 'password1',
                profile: {
                    name: 'Alice',
                    phone: '111-1111',
                    profilePicUrl: '',
                    company: 'Acme Inc.'
                }
            },
            {
                email: 'bob@example.com',
                passwordHash: 'password2',
                profile: {
                    name: 'Bob',
                    phone: '222-2222',
                    profilePicUrl: '',
                    company: 'Beta LLC'
                }
            },
            {
                email: 'carol@example.com',
                passwordHash: 'password3',
                profile: {
                    name: 'Carol',
                    phone: '333-3333',
                    profilePicUrl: '',
                    company: 'Carol Co.'
                }
            },
            {
                email: 'dave@example.com',
                passwordHash: 'password4',
                profile: {
                    name: 'Dave',
                    phone: '444-4444',
                    profilePicUrl: '',
                    company: 'Delta Ltd.'
                }
            },
            {
                email: 'eve@example.com',
                passwordHash: 'password5',
                profile: {
                    name: 'Eve',
                    phone: '555-5555',
                    profilePicUrl: '',
                    company: 'Epsilon GmbH'
                }
            }
        ]

        const users = await User.create(sample)
        console.log('👥 Created users:', users.map(u => u.email).join(', '))

        // quick lookup
        const byEmail = users.reduce((acc, u) => {
            acc[u.email] = u
            return acc
        }, {})

        // Establish “friend” arrays
        const pairs = [
            ['alice@example.com', 'bob@example.com'],
            ['alice@example.com', 'carol@example.com'],
            ['bob@example.com', 'dave@example.com'],
            ['carol@example.com', 'eve@example.com']
        ]

        for (const [a, b] of pairs) {
            const ua = byEmail[a]
            const ub = byEmail[b]

            // push B into A, and A into B if not already there
            if (!ua.friends.includes(ub._id)) ua.friends.push(ub._id)
            if (!ub.friends.includes(ua._id)) ub.friends.push(ua._id)
        }

        // Save all modified docs
        await Promise.all(users.map(u => u.save()))
        console.log('🤝 Seeded friendships')

    } catch (err) {
        console.error('❌ Seed error:', err)
    } finally {
        await mongoose.disconnect()
        console.log('🔌 MongoDB connection closed')
    }
}

main()
