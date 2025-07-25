import axios, { type AxiosResponse } from 'axios'

const base = import.meta.env.VITE_API_BASE_URL as string

export interface Profile {
    _id: string
    email: string
    profile: {
        name: string
        phone: string
        profilePicUrl: string
        company: string
    }
    friends: { 
        _id: string;
        profile: { 
            name: string; 
            profilePicUrl: string 
        }; 
        email: string 
    }[]
}

export const getProfile = (id: string, token: string): Promise<AxiosResponse<Profile>> => 
    axios.get(`${base}/api/users/${id}`, { headers: { Authorization: `Bearer ${token}` } })

export const addFriend = (targetId: string, token: string): Promise<AxiosResponse<{ message: string }>> =>
    axios.post(`${base}/api/users/${targetId}/friends`, null, { headers: { Authorization: `Bearer ${token}` } })

export const listFriends = (id: string, token: string): Promise<AxiosResponse<Profile['friends']>> =>
    axios.get(`${base}/api/users/${id}/friends`, { headers: { Authorization: `Bearer ${token}` } })
