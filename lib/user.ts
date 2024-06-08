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

const loginUser = async ({username, password}: {username: string, password: string}): Promise<object> => {
    try {

        const res: AxiosResponse = await api.post('/user/login', {
            username: username,
            password: password
        }, {
            withCredentials: true
        })

        console.log(res.data)

        return res.data
    } catch (error) {
        console.log(error)

        // @ts-ignore
        return error.response
    }
}

// @ts-ignore
const logoutUser = async (): Promise<object> => {
    try {
        const res: AxiosResponse = await api.post('/user/logout', {}, {
            withCredentials: true
        })

        return res.data
    } catch (error) {
        // @ts-ignore
        return error.response.data
    }
}

const isAdmin = async (token: string): Promise<object> => {
    try {
        const res: AxiosResponse = await api.get('/admin/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        console.log(res.data)

        if (res.data['is_valid'] === true) {
            return {'is_admin': true}
        } else {
            return {'is_admin': false, 'message': res.data['message']}
        }
    } catch(error) {
        console.log(error)
    }

    return {'is_admin': false, 'message': 'An unknown TS error has occurred'}
}

export { registerUser, listUsers, updateUser, deleteUser, loginUser, logoutUser, isAdmin }