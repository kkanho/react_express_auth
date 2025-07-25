export interface Profile {
    _id: string
    email: string
    profile: {
        name: string
        phone: string
        profilePicUrl: string
        company: string
    }
    friends: { _id: string; profile: { name: string; profilePicUrl: string }; email: string }[]
}
