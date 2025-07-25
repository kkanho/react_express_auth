import axios, { type AxiosResponse } from 'axios'

const base = import.meta.env.VITE_API_BASE_URL as string

interface RegisterData {
    email: string
    password: string
    name: string
    phone: string
    profilePicUrl: string
    company: string
}

interface LoginData {
    email: string
    password: string
}

export const register = (data: RegisterData): Promise<AxiosResponse<{ id: string }>> =>
    axios.post(`${base}/api/auth/register`, data)

export const login = (data: LoginData): Promise<AxiosResponse<{ token: string }>> =>
    axios.post(`${base}/api/auth/login`, data)
