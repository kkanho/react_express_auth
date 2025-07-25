import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const { Schema, model } = mongoose

// Sub‐schema for profile details
const profileSchema = new Schema({
    name: { type: String, default: '' },
    phone: { type: String, default: '' },
    profilePicUrl: { type: String, default: '' },
    company: { type: String, default: '' },
}, { _id: false })

// Main User schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    profile: {
        type: profileSchema,
        default: () => ({})
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {
    timestamps: true
})

// Hash passwordHash before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('passwordHash')) return next()
    try {
        const salt = await bcrypt.genSalt(10)
        this.passwordHash = await bcrypt.hash(this.passwordHash, salt)
        next()
    } catch (err) {
        next(err)
    }
})

// Compare a plain-text password to stored hash
userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.passwordHash)
}

const User = model('User', userSchema)
export default User
