import { CredentialResponse } from "@react-oauth/google"
import apiClient from "./api-client"


export enum UserRole {
    Admin = 'admin',
    Owner = 'owner',
    Tenant = 'tenant',
}

export interface IUser {
    name: string,
    email: string,
    password: string,
    roles?: UserRole,
    profile_image?: string
    _id?: string
    accessToken?: string,
    refreshToken?: string
    tokens?:string[];
}

export interface ILogin{
    name: string,
    email: string,
    password: string,
}

export const registerUser = (user: IUser) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log('Registering user...')
        console.log(user)
        apiClient.post('/auth/register', user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    });
}


export const loginUser = (user: ILogin) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any>((resolve, reject) => {
        console.log('Login user...')
        console.log(user)
        apiClient.post('/auth/login', user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    });
}


export const googleSignin = (credentialResponse: CredentialResponse) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return new Promise<any>((resolve, reject) => {
        console.log("googleSignin ...")
        apiClient.post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}