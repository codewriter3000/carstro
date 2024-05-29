import api from './api'
import type {AxiosResponse} from 'axios'

const registerUser = async ({username, password, first_name, last_name, is_admin, is_enabled}:
                                {
                                    username: string,
                                    password: string,
                                    first_name: string,
                                    last_name: string,
                                    is_admin: string,
                                    is_enabled: string
                                }): Promise<object> => {
    try {
        const res: AxiosResponse<any, any> = await api.post('/user/create', {
            username, password, first_name, last_name, is_admin, is_enabled
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const listUsers = async (): Promise<object[]> => {
    try {
        const res: AxiosResponse = await api.get('/users/list')

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const updateUser = async (user_id: number, {username, first_name, last_name, is_admin, is_enabled}:
                            {
                                username: string,
                                first_name: string,
                                last_name: string,
                                is_admin: boolean,
                                is_enabled: boolean
                            }): Promise<object[]> => {
    try {
        const res: AxiosResponse = await api.put(`/users/${user_id}`, {
        username, first_name, last_name, is_admin, is_enabled
    })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const deleteUser = async (user_id: number): Promise<object[]> => {
    try {
        const res: AxiosResponse = await api.delete(`/users/${user_id}`)

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

export {registerUser, listUsers, updateUser, deleteUser}