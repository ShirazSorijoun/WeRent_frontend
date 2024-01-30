import apiClient from "./api-client"

export interface IUser {
    name: string,
    email: string,
    password: string,
    roles: "admin",
    profile_image: string
    _id?: string
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